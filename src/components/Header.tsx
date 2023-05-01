import { Header as HeaderRNE, HeaderProps, Icon } from "@rneui/themed";

export const Header = (props: HeaderProps) => {
  return (
    <HeaderRNE
      placement="left"
      leftComponent={<Icon name="heart" color="#fff" type="font-awesome" />}
      centerComponent={{ text: "MY TITLE", style: { color: "#000" } }}
      rightComponent={{ icon: "home", color: "#fff" }}
      {...props}
    />
  );
};
