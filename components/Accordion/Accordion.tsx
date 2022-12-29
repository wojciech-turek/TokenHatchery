import classNames from "classnames";
import React from "react";
import styles from "./Accordion.module.scss";

const Item = ({
  children,
  onClick,
  moveNext,
  active,
  lastChild,
  completed,
  setCompleted,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  moveNext?: () => void;
  active?: boolean;
  lastChild?: boolean;
  completed?: boolean;
  setCompleted?: (completed: boolean) => void;
}) => {
  return (
    <div className={styles.item}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            // @ts-ignore
            active,
            onClick,
            moveNext,
            lastChild,
            completed,
            setCompleted,
          });
        }
        return child;
      })}
    </div>
  );
};

const Header = ({
  children,
  active,
  onClick,
  completed,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  completed?: boolean;
}) => {
  const handleClick = () => {
    if (!completed) return;
    onClick && onClick();
  };
  return (
    <div
      onClick={handleClick}
      className={classNames(styles.header, {
        [styles.active]: active,
        [styles.completed]: completed,
      })}
    >
      {children} {completed && " - Completed"}
    </div>
  );
};

Item.Header = Header;

const Body = ({
  children,
  active,
  moveNext,
  lastChild,
  setCompleted,
  canMoveNext,
}: {
  children: React.ReactNode;
  active?: boolean;
  moveNext?: () => void;
  lastChild?: boolean;
  setCompleted?: () => void;
  canMoveNext?: boolean;
}) => {
  const handleContinue = () => {
    setCompleted && setCompleted();
    moveNext && moveNext();
  };
  return (
    <div
      className={classNames(styles.body, {
        [styles.active]: active,
      })}
    >
      {children}
      {!lastChild && (
        <div>
          <button onClick={handleContinue} disabled={!canMoveNext}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

Item.Body = Body;

const Accordion = ({ children }: { children: React.ReactNode }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);

  const handleClick = (index: number) => {
    if (index === activeIndex) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };

  const moveNext = () => {
    setActiveIndex(activeIndex + 1);
  };

  return (
    <div className={styles.accordion}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            // @ts-ignore
            onClick: () => handleClick(index),
            moveNext: () => moveNext(),
            active: index === activeIndex,
            lastChild: index === React.Children.count(children) - 1,
            completed: completedSteps.includes(index),
            setCompleted: () => setCompletedSteps([...completedSteps, index]),
          });
        }
        return child;
      })}
    </div>
  );
};

Accordion.Item = Item;
Accordion.Header = Header;
Accordion.Body = Body;
export default Accordion;
