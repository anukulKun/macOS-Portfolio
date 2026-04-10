export interface SiteData {
  id: string;
  apwetitle: string;
  img?: string;
  link: string;
  inner?: boolean;
}

export interface SiteSectionData {
  title: string;
  sites: SiteData[];
}

export interface WebsitesData {
  favorites: SiteSectionData;
  freq: SiteSectionData;
}
