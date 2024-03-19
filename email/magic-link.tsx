import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface MagicLinkEmailProps {
  url?: string;
  name?: string;
}

export const MagicLinkEmail = ({ url, name }: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Log in with this magic link.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://utfs.io/f/e81d92c5-7405-4578-a1e7-95d8c122e2d5-20fr50.svg`}
          width={50}
          height={50}
          alt='Elite Jobs'
          style={{
            objectFit: "cover",
            objectPosition: "0 0",
            margin: "0",
            width: "20%",
            height: "10%",
          }}
        />

        <Heading style={heading}>Your magic link 🪄 </Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Button style={button} href={url}>
              👉 Click here to log in 👈
            </Button>
          </Text>
          <Text style={paragraph}>
            Hi, {name}, If you didn't request this, please ignore this email.
          </Text>
        </Section>
        <Text style={paragraph}>
          Kind Regards,
          <br />
          Resources Team
        </Text>
        <Hr style={hr} />
        <Img
          src={`https://utfs.io/f/e81d92c5-7405-4578-a1e7-95d8c122e2d5-20fr50.svg`}
          width={32}
          height={32}
          style={{
            WebkitFilter: "grayscale(100%)",
            filter: "grayscale(100%)",
            margin: "20px 0",
            width: "20%",
            height: "10%",
            objectPosition: "0 0",
          }}
        />
        <Text style={footer}>Resources Inc.</Text>
        <Text style={footer}>2024 Uganda #56, Kampala, Kireka 19703</Text>
      </Container>
    </Body>
  </Html>
);

export default MagicLinkEmail;

const button = {
  backgroundColor: "#020617",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "11px 23px",
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: `url('/assets/resources-bg.jpg')`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};
