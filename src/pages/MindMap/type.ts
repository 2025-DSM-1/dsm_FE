export interface RawLaw {
  lawId: number;
  lawSerialNumber: number;
  lawTitle: string;
  lawContent: string;
  promulgationDate: string;
  resolutionResult: string
}

export interface LawDetail {
  lawId: number;
  lawTitle: string;
  lawSummaryContent: Array<{
    summaryElement: string;
  }>;
  lawStatus: string;
  propositionDate: string;
  backgroundInfo: string;
  example: string;
}

export interface VoteLogic {
  lawId: number;
  agreeLogic: string;
  disagreeLogic: string;
}

export interface VoteResult {
  agree: number;
  disagree: number;
  totalVote: number;
}

export interface Comment {
  commentId: number;
  commentType: 'BASIC' | 'ADDITIONAL' | 'REBUTTAL';
  voteType: 'AGREE' | 'DISAGREE';
  content: string;
  author: string;
}

export interface CommentsResponse {
  comments: Comment[];
}

export interface Law {
  lawId: number;
  lawSerialNumber: number;
  lawTitle: string;
  lawStatus: string
  lawContent: string;
  promulgationDate: string;
  resolutionResult: string
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  lawId: number;
}

export interface MindMapNode {
  id: string;
  law: Law;
  x: number;
  y: number;
  connections: string[];
}

export interface MindMapGroup {
  id: string;
  name: string;
  nodeIds: string[];
  color?: string;
  rect: { left: number; top: number; width: number; height: number };
}