export interface ForumMetaData {
  id: number;
  name: string;
  description: string;
  metaDescription: string;
  category: { id: number; name: string };
  nbPages: number;
}
