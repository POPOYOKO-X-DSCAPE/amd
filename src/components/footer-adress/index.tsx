import { Stack } from "@packages/ui";

interface FooterAdressProps {
  title: string;
  content: string;
}

const FooterAdress: React.FC<FooterAdressProps> = ({ title, content }) => (
  <Stack>
    <span className="footer-address-title">{title}</span>
    <span className="footer-address-content">{content}</span>
  </Stack>
);

export default FooterAdress;
