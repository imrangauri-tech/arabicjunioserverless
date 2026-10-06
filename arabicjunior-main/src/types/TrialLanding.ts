/**
 * City landing page content (/dubai, /sharjah, /trial-landing …), managed from
 * Admin → Trial & Landing Pages. Any string may contain `{city}`, which the
 * page replaces with the page's city when it renders.
 */

export interface IconTitleSubtitle {
  icon: string;
  title: string;
  subtitle: string;
}

export interface IconTitleDescription {
  icon: string;
  title: string;
  description: string;
}

export interface LandingCtaPair {
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
}

export interface LandingHero extends LandingCtaPair {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  titleHighlight: string;
  subheading: string;
  /** Plain text; `**words**` renders bold. */
  description: string;
  imageUrl: string;
  imagePublicId?: string;
  imageAlt: string;
  floatingCards: IconTitleSubtitle[];
  bottomFeatures: IconTitleSubtitle[];
}

export interface LandingCurriculum extends LandingCtaPair {
  show: boolean;
  badge: string;
  title: string;
  titleHighlight: string;
  paragraphs: string[];
  features: IconTitleDescription[];
  bannerTitle: string;
  bannerSubtitle: string;
}

export interface LandingWhyChoose extends LandingCtaPair {
  show: boolean;
  badge: string;
  titlePrefix: string;
  titleHighlight1: string;
  titleHighlight2: string;
  titleSuffix: string;
  introText: string;
  features: IconTitleDescription[];
  ctaTitle: string;
  ctaDescription: string;
}

export interface LandingAdvantage extends LandingCtaPair {
  show: boolean;
  badge: string;
  title: string;
  titleHighlightPrefix: string;
  titleHighlight: string;
  paragraphs: string[];
  leftFeatures: IconTitleSubtitle[];
  pillars: IconTitleDescription[];
  sidebarLabel: string;
  sidebarTitle: string;
  sidebarText: string;
  trustPoints: { icon: string; text: string }[];
  stats: { icon: string; value: string; label: string }[];
}

export interface LandingFamilies extends LandingCtaPair {
  show: boolean;
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  leftIntro: string;
  benefitsBoxTitle: string;
  benefits: IconTitleDescription[];
  rightHeading: string;
  rightHeadingHighlight: string;
  rightParagraphs: string[];
  bannerItem1Title: string;
  bannerItem1Text: string;
  bannerItem2Title: string;
  bannerItem2Text: string;
}

export interface TrialLandingPage {
  _id: string;
  title: string;
  slug: string;
  city: string;
  hero: LandingHero;
  curriculum: LandingCurriculum;
  whyChoose: LandingWhyChoose;
  advantage: LandingAdvantage;
  families: LandingFamilies;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  ogImageUrl: string;
  indexPage: boolean;
  createdAt?: string;
  updatedAt?: string;
}
