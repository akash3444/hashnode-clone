import { DEFAULT_PROFILE_PICTURE } from "@/lib/constants";
import { FC } from "react";
import {
  Mention,
  MentionsInput,
  OnChangeHandlerFunc,
  SuggestionDataItem,
} from "react-mentions";

interface CommentInputProps {
  value: string;
  onChange: OnChangeHandlerFunc;
  users: SuggestionDataItem[];
}

const CommentInput: FC<CommentInputProps> = ({ value, onChange, users }) => {
  return (
    <MentionsInput
      value={value}
      onChange={onChange}
      placeholder="Write a thoughtful comment"
      a11ySuggestionsListLabel="Suggested mentions"
      className="react-mentions"
    >
      <Mention
        markup="@[__display__](@__id__)"
        displayTransform={(id, display) => `@[${display}](@${id})`}
        trigger="@"
        data={users}
        renderSuggestion={(suggestion, _, highlightedDisplay) => (
          <div className="flex items-center gap-3">
            <img
              src={DEFAULT_PROFILE_PICTURE}
              alt=""
              className="h-10 w-10 rounded-full"
            />
            <div>
              <h6 className="font-medium">{highlightedDisplay}</h6>
              <span className="text-foreground-500">@{suggestion.id}</span>
            </div>
          </div>
        )}
      />
    </MentionsInput>
  );
};

export default CommentInput;
