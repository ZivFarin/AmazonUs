import classes from "./BanCard.module.css";

const BanCard = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default BanCard;
