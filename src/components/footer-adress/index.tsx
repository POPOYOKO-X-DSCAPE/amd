import { Heading, HeadingLevel } from "@ariakit/react";
import { Stack } from "@packages/ui/abstract/stack";

interface FooterAdressProps {
  title: string;
  content: string;
}

const FooterAdress: React.FC<FooterAdressProps> = ({ title, content }) => (
  <Stack>
    <HeadingLevel>
      <Heading>{title}</Heading>
      <span className="footer-address-content">{content}</span>
    </HeadingLevel>
  </Stack>
);

export default FooterAdress;
