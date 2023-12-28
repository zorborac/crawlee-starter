import type { Post } from "../interfaces";

export const BASE_URL = "https://realiterate.com";

export const EMAIL_REGEX = /\S+@\S+\.\S+/;

// not currently used but as LLM actually integrated sort of the approach I'd head towards
export const INTERESTING_STRINGS = [
  "username",
  "created_at",
  "email",
  "bookmarks",
  "likes",
  "date",
  "followers",
  "email",
];

// export const POST_MODEL_WITH_SELECTORS = {
//   username: { default: "", selector: null },
//   createdAt: { default: "", selector: null },
//   body: { default: "", selector: null },
//   hasIterations: { default: false, selector: null },
// };
// todo add tests back
// this is tricky but few shot can get it mostly there... tbh any web dev still faster than this
export const EXPECTED_RETURNED_MODEL_EXAMPLE = {
  username: "wouldnt-add",
  createdAt: "28/12/2023 @ 12:15",
  body: `hello what an interesting thing to see whow no delete and backspace that is ankoying af hehe

  i could see the fun in it however.
  
  lets goo`,
  hasIterations: true,
};
// generate with LLM
export const POST_MODEL_WITH_SELECTORS_GENERATED = {
  username: { default: "", selector: "pre > div > a" },
  createdAt: { default: "", selector: "pre span.date-time-created" },
  body: { default: "", selector: "p.preserve-newlines" },
  hasIterations: { default: false, selector: ".iterations-btn" },
};

export const PROVIDED_INPUT_JSON = [
  {
    friendlyName: "HOME",
    path: "?home=true",
    baseModel: POST_MODEL_WITH_SELECTORS_GENERATED,
    rootSelector: ".story-card",
  },
];
