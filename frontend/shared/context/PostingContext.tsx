import { createContext, useContext, useState } from "react";

interface PostingContextProps {
  listImageUsingPost: string[];
  setListImageUsingPost: React.Dispatch<React.SetStateAction<string[]>>;
}

const PostingContext = createContext<PostingContextProps | undefined>(
  undefined
);

export const PostingProdiver = ({ children }: any) => {
  const [listImageUsingPost, setListImageUsingPost] = useState<string[]>([]);

  return (
    <PostingContext.Provider
      value={{ listImageUsingPost, setListImageUsingPost }}
    >
      {children}
    </PostingContext.Provider>
  );
};

export const usePostingContext = () => {
  const context = useContext(PostingContext);
  if (!context) {
    throw new Error(
      "usePageManagerContext must be used within a PageManagerProvider"
    );
  }
  return context;
};
