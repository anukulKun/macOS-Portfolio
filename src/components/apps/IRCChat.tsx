import React, { useState, useEffect, useRef, useCallback } from "react";
import Gun from "gun";
import "~/styles/irc-chat.css";

// ── Constants ───────────────────────────────────────────────────────────
// To self-host: npm i gun express, then:
//   const app = require('express')(); const server = app.listen(8765);
//   require('gun')({ web: server });
// Then add "http://localhost:8765/gun" (or your domain) to the list below.
const GUN_PEERS = import.meta.env.DEV
  ? ["http://localhost:8765/gun"]
  : ["https://macos-relay.onrender.com/gun"];
const CHANNEL = "anukulKul-irc-general";
const MAX_MESSAGES = 200;
const PRESENCE_INTERVAL = 5000;
const PRESENCE_TIMEOUT = 15000;
const STALE_CLEANUP_INTERVAL = 10000;
const MAX_MESSAGE_AGE = 24 * 60 * 60 * 1000;

const TEXT_REPLACEMENTS: Record<string, string> = {
  shrug: "¯\\_(ツ)_/¯",
  tableflip: "(╯°□°)╯︵ ┻━┻",
  unflip: "┬─┬ノ( º _ ºノ)",
  lenny: "( ͡° ͜ʖ ͡°)"
};

const COMMANDS: Record<string, { solo: string; target: string }> = {
  slap: {
    solo: "slaps around a bit with a large trout 🐟",
    target: "slaps {target} around with a large trout 🐟"
  },
  hug: { solo: "hugs everyone 🤗", target: "hugs {target} 🤗" },
  poke: { solo: "pokes the void 👉", target: "pokes {target} 👉" },
  wave: { solo: "waves at everyone 👋", target: "waves at {target} 👋" },
  dance: { solo: "dances 💃🕺", target: "dances with {target} 💃🕺" },
  highfive: { solo: "high-fives the air ✋", target: "high-fives {target} ✋" },
  bonk: { solo: "bonks themselves 🔨", target: "bonks {target} 🔨" }
};

// ── Helpers ─────────────────────────────────────────────────────────────
function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function uuidToColor(uuid: string): string {
  let hash = 0;
  for (let i = 0; i < uuid.length; i++) {
    hash = uuid.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 65%)`;
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    const s = date.getSeconds().toString().padStart(2, "0");
    return `[${h}:${m}:${s}]`;
  }
  const d = date.getDate().toString().padStart(2, "0");
  const mo = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear().toString().slice(-2);
  return `[${d}/${mo}/${y}]`;
}

// ── Types ───────────────────────────────────────────────────────────────
interface ChatMessage {
  key: string;
  nick: string;
  uuid: string;
  text: string;
  time: number;
  action?: boolean;
  type?: string;
}

interface OnlineUser {
  nick: string;
  uuid: string;
  lastSeen: number;
}

// ── Simple markdown-ish rendering ───────────────────────────────────────
function renderText(text: string, onlineUsers: Record<string, OnlineUser>) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const codeParts = part.split(/(`[^`]+`)/g);
    return codeParts.map((cp, j) => {
      if (cp.startsWith("`") && cp.endsWith("`")) {
        return (
          <code key={`${i}-${j}`} className="irc-msg-code">
            {cp.slice(1, -1)}
          </code>
        );
      }
      const mentionParts = cp.split(/(@\w+)/g);
      return mentionParts.map((mp, k) => {
        if (mp.startsWith("@")) {
          const mentionNick = mp.slice(1);
          const user = onlineUsers[mentionNick];
          const color = user ? uuidToColor(user.uuid) : "#9b59b6";
          return (
            <span key={`${i}-${j}-${k}`} style={{ color, fontWeight: 600 }}>
              {mp}
            </span>
          );
        }
        return <span key={`${i}-${j}-${k}`}>{mp}</span>;
      });
    });
  });
}

// ── Component ───────────────────────────────────────────────────────────
export default function IRCChat() {
  const [nick, setNick] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<Record<string, OnlineUser>>({});
  const [status, setStatus] = useState("Disconnected");
  const [showUsers, setShowUsers] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNarrow, setIsNarrow] = useState(false);

  const gunRef = useRef<any>(null);
  const chatRef = useRef<any>(null);
  const presenceRef = useRef<any>(null);
  const myUUID = useRef("");
  const seenKeys = useRef(new Set<string>());
  const joinTimeRef = useRef(0);
  const onlineRef = useRef<Record<string, OnlineUser>>({});
  const messagesRef = useRef<ChatMessage[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalsRef = useRef<number[]>([]);

  const scrollToBottom = useCallback(() => {
    const el = logEndRef.current?.parentElement;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Responsive: detect narrow container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setIsNarrow(entry.contentRect.width < 500);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [loggedIn]);

  // Try auto-login from localStorage
  useEffect(() => {
    const savedNick = localStorage.getItem("irc-nick");
    const savedUUID = localStorage.getItem("irc-uuid");
    if (savedNick && savedUUID) {
      setNick(savedNick);
      myUUID.current = savedUUID;
      doConnect(savedNick, savedUUID);
    }
    return () => cleanup();
  }, []);

  function cleanup() {
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
    if (gunRef.current) {
      try {
        gunRef.current.off();
      } catch (_) {}
      gunRef.current = null;
    }
    chatRef.current = null;
    presenceRef.current = null;
  }

  function doConnect(myNick: string, uuid: string) {
    setLoggedIn(true);
    joinTimeRef.current = Date.now();
    setStatus("Connecting...");

    const gun = Gun({ peers: GUN_PEERS, localStorage: false });
    gunRef.current = gun;

    const db = gun.get(CHANNEL);
    const chat = db.get("messages");
    const presence = db.get("presence");
    chatRef.current = chat;
    presenceRef.current = presence;

    // Subscribe to messages
    chat.map().on((data: string, key: string) => {
      if (!data || seenKeys.current.has(key)) return;
      try {
        const m: ChatMessage = typeof data === "string" ? JSON.parse(data) : data;
        if (!m.text || !m.time) return;
        if (Date.now() - m.time > MAX_MESSAGE_AGE) return;

        const isJoinLeave =
          m.type === "system" &&
          (m.text.includes("entered the room") || m.text.includes("left the room"));
        if (isJoinLeave && m.time < joinTimeRef.current) return;

        seenKeys.current.add(key);
        const msg: ChatMessage = { ...m, key };

        messagesRef.current = [...messagesRef.current, msg]
          .sort((a, b) => a.time - b.time)
          .slice(-MAX_MESSAGES);
        setMessages([...messagesRef.current]);
      } catch (_) {}
    });

    // Add self to online users immediately
    onlineRef.current[myNick] = { nick: myNick, uuid: uuid, lastSeen: Date.now() };
    setOnlineUsers({ ...onlineRef.current });

    // Subscribe to presence
    presence.map().on((data: any, pNick: string) => {
      if (!pNick) return;
      if (!data || data === null || data.status !== "online") {
        if (onlineRef.current[pNick] && pNick !== myNick) {
          delete onlineRef.current[pNick];
          setOnlineUsers({ ...onlineRef.current });
        }
        return;
      }
      if (data.nick && data.uuid) {
        onlineRef.current[pNick] = {
          nick: data.nick,
          uuid: data.uuid,
          lastSeen: data.lastSeen || Date.now()
        };
        setOnlineUsers({ ...onlineRef.current });
      }
    });

    // Announce presence
    function announce() {
      onlineRef.current[myNick] = { nick: myNick, uuid: uuid, lastSeen: Date.now() };
      presence.get(myNick).put({
        nick: myNick,
        uuid: uuid,
        status: "online",
        lastSeen: Date.now()
      });
    }
    announce();

    // Broadcast join
    const joinKey = Date.now() + "-" + Math.random().toString(36).substr(2, 6);
    chat.get(joinKey).put(
      JSON.stringify({
        nick: myNick,
        uuid: uuid,
        text: "entered the room",
        time: Date.now(),
        type: "system"
      })
    );

    const presIntv = window.setInterval(announce, PRESENCE_INTERVAL);

    const staleIntv = window.setInterval(() => {
      const now = Date.now();
      let changed = false;
      Object.keys(onlineRef.current).forEach((n) => {
        if (now - onlineRef.current[n].lastSeen > PRESENCE_TIMEOUT) {
          presence.get(n).put(null);
          delete onlineRef.current[n];
          changed = true;
        }
      });
      if (changed) setOnlineUsers({ ...onlineRef.current });
    }, STALE_CLEANUP_INTERVAL);

    intervalsRef.current.push(presIntv, staleIntv);
    setStatus("Connected as " + myNick);
  }

  function handleLogin() {
    const trimmed = nick.trim();
    if (!trimmed || trimmed.length > 15) return;
    if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) return;

    const uuid = generateUUID();
    myUUID.current = uuid;
    localStorage.setItem("irc-nick", trimmed);
    localStorage.setItem("irc-uuid", uuid);
    setNick(trimmed);
    doConnect(trimmed, uuid);
  }

  function handleLogout() {
    if (chatRef.current && nick) {
      const leaveKey = Date.now() + "-" + Math.random().toString(36).substr(2, 6);
      chatRef.current.get(leaveKey).put(
        JSON.stringify({
          nick,
          uuid: myUUID.current,
          text: "left the room",
          time: Date.now(),
          type: "system"
        })
      );
      if (presenceRef.current) {
        presenceRef.current.get(nick).put(null);
      }
    }
    cleanup();
    localStorage.removeItem("irc-nick");
    localStorage.removeItem("irc-uuid");
    setLoggedIn(false);
    setMessages([]);
    messagesRef.current = [];
    seenKeys.current.clear();
    onlineRef.current = {};
    setOnlineUsers({});
    setNick("");
    myUUID.current = "";
    setStatus("Disconnected");
  }

  function sendMessage() {
    const text = inputText.trim();
    if (!text || !chatRef.current) return;
    setInputText("");

    if (text === "/help" || text === "/commands") {
      const helpMsg: ChatMessage = {
        key: "help-" + Date.now(),
        nick: "system",
        uuid: "",
        text: `**Commands:** ${Object.keys(COMMANDS)
          .map((c) => "/" + c)
          .join(", ")} | **Shortcuts:** ${Object.keys(TEXT_REPLACEMENTS)
          .map((c) => "/" + c)
          .join(", ")}`,
        time: Date.now(),
        type: "system"
      };
      messagesRef.current = [...messagesRef.current, helpMsg].slice(-MAX_MESSAGES);
      setMessages([...messagesRef.current]);
      return;
    }

    if (text.startsWith("/")) {
      const parts = text.slice(1).split(" ");
      const command = parts[0].toLowerCase();
      const target = parts.slice(1).join(" ").trim();

      if (TEXT_REPLACEMENTS[command]) {
        const replacement = TEXT_REPLACEMENTS[command];
        publishMessage(target ? replacement + " " + target : replacement);
        return;
      }

      if (COMMANDS[command]) {
        const cmd = COMMANDS[command];
        const actionText = target ? cmd.target.replace("{target}", target) : cmd.solo;
        publishMessage(actionText, true);
        return;
      }
    }

    publishMessage(text);
  }

  function publishMessage(text: string, isAction = false) {
    const key = Date.now() + "-" + Math.random().toString(36).substr(2, 6);
    const msg: ChatMessage = {
      key,
      nick,
      uuid: myUUID.current,
      text,
      time: Date.now(),
      action: isAction,
      type: "msg"
    };

    // Optimistic local update — show immediately
    if (!seenKeys.current.has(key)) {
      seenKeys.current.add(key);
      messagesRef.current = [...messagesRef.current, msg]
        .sort((a, b) => a.time - b.time)
        .slice(-MAX_MESSAGES);
      setMessages([...messagesRef.current]);
    }

    // Broadcast via Gun if connected
    if (chatRef.current) {
      chatRef.current.get(key).put(JSON.stringify(msg));
    }
  }

  function insertMention(targetNick: string) {
    setInputText((prev) => prev + `@${targetNick} `);
    inputRef.current?.focus();
  }

  // ── Login screen ──────────────────────────────────────────────────────
  if (!loggedIn) {
    return (
      <div className="irc-login">
        <div className="irc-login-box">
          <div className="irc-login-title">#general</div>
          <div className="irc-login-sub">Gun.js P2P IRC Chat</div>
          <input
            className="irc-login-input"
            type="text"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter nickname..."
            maxLength={15}
          />
          <div>
            <button className="irc-login-btn" onClick={handleLogin}>
              Join
            </button>
          </div>
          <div className="irc-login-hint">Alphanumeric, underscores, hyphens only</div>
        </div>
      </div>
    );
  }

  // ── Chat UI ───────────────────────────────────────────────────────────
  const sortedOnline = Object.keys(onlineUsers).sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );
  const maxNick = isNarrow ? 8 : 10;

  return (
    <div ref={containerRef} className={`irc-root${isNarrow ? " narrow" : ""}`}>
      {/* Header */}
      <div className="irc-header">
        <span className="irc-channel">#general</span>
        {!isNarrow && <span className="irc-status">{status}</span>}
        <button
          className={`irc-online-btn${showUsers ? " active" : ""}`}
          onClick={() => setShowUsers(!showUsers)}
        >
          {sortedOnline.length} online
        </button>
        <button className="irc-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Body */}
      <div className="irc-body">
        {/* Chat log */}
        <div className="irc-log">
          {messages.map((msg) => {
            const isSystem = msg.type === "system";
            const isAction = msg.action;
            const isLeave = isSystem && msg.text.includes("left the room");
            const nickColor = msg.uuid ? uuidToColor(msg.uuid) : "#888";
            const displayNick = isSystem ? "system" : msg.nick;
            const padded = displayNick.substring(0, maxNick).padStart(maxNick, "\u00A0");

            let displayText = msg.text;
            if (isSystem && msg.nick && msg.nick !== "system") {
              displayText = `@${msg.nick} ${msg.text}`;
            } else if (isAction) {
              displayText = `@${msg.nick} ${msg.text}`;
            }

            const cls = `irc-msg${isSystem ? " system" : ""}${isLeave ? " leave" : ""}${isAction ? " action" : ""}`;

            return (
              <div key={msg.key} className={cls}>
                {!isNarrow && (
                  <span className="irc-msg-time">{formatTime(msg.time)} </span>
                )}
                <span className="irc-msg-nick">
                  <span className="irc-msg-pipe">| </span>
                  <span style={{ color: isSystem ? "#555" : nickColor }}>{padded}</span>
                  <span className="irc-msg-angle">&gt; </span>
                </span>
                <span className="irc-msg-text">
                  {renderText(displayText, onlineUsers)}
                </span>
              </div>
            );
          })}
          <div ref={logEndRef} />
        </div>

        {/* User list */}
        {showUsers && (
          <div className={`irc-users${isNarrow ? " overlay" : ""}`}>
            <div className="irc-users-title">Users</div>
            {sortedOnline.map((n) => (
              <div
                key={n}
                className="irc-user-item"
                onClick={() => {
                  if (n !== nick) {
                    insertMention(n);
                    setShowUsers(false);
                  }
                }}
                style={{
                  color: onlineUsers[n] ? uuidToColor(onlineUsers[n].uuid) : "#aaa",
                  cursor: n !== nick ? "pointer" : "default",
                  fontWeight: n === nick ? 700 : 400
                }}
              >
                {n}
                {n === nick ? " (you)" : ""}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="irc-footer">
        {!isNarrow && (
          <span className="irc-nick-label" style={{ color: uuidToColor(myUUID.current) }}>
            {nick}:
          </span>
        )}
        <input
          ref={inputRef}
          className="irc-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder={
            isNarrow ? "/help for cmds" : "Type a message... (/help for commands)"
          }
        />
        <button className="irc-send-btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
