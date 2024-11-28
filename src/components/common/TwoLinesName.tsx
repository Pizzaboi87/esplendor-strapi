import { Fragment } from "react";

export const TwoLinesName = ({ name }: { name: string }) => {
  return name.split("-").map((part, index, array) => (
    <Fragment key={index}>
      {part}
      {index < array.length - 1 && <br />}
    </Fragment>
  ));
};
