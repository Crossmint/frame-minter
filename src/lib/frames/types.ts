// TODO: remove if https://github.com/coinbase/onchainkit/issues/82 is resolved

export type FrameButtonMetadata = {
  label: string;
  action?: "post" | "post_redirect";
};
export type FrameInputMetadata = {
  text: string;
};
export type FrameMetadata = {
  buttons?: [FrameButtonMetadata, ...FrameButtonMetadata[]];
  image: string;
  input?: FrameInputMetadata;
  post_url?: string;
  refresh_period?: number;
};
