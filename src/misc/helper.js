import { useState } from 'react';

// Pass time in millisec.
export function getdate(time) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    minute: 'numeric',
    hour: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).format(time);

  return formattedDate;
}

export function getFormattedComments(comments) {
  const parentComment = comments.filter((comment) => comment.parent === 0);

  const finalComment = parentComment.map((comment) => {
    const childComment = comments.filter((c) => c.parent === comment.id);
    comment = { ...comment, children: childComment };
    return comment;
  });

  return finalComment;
}

export function useDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  return { isOpen, handleDrawerOpen, handleDrawerClose };
}

// const showComments = (comment) => {
//   if (comment.children.length === 0) {
//     console.log(comment);
//     return;
//   }

//   for (let i = 0; i < comment.children.length; i++) {
//     // console.log(i, comment);

//     showComments(comment.children[i]);
//   }
//   console.log(comment);
// };

// for (let i = 0; i < comments.length; i++) {
//   showComments(comments[i]);
// }
