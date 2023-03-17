import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  NavLink,
  Paper,
  TextInput,
  Stack,
  Group,
  Button,
  Flex,
  Box,
} from "@mantine/core";
import Baru from "./baru";
import { useShallowEffect } from "@mantine/hooks";

const listmenu = [
  {
    name: "menu1",
    id: 1,
  },
  {
    name: "menu2",
    id: 2,
  },
  {
    name: "menu3",
    id: 3,
  },
  {
    name: "menu4",
    id: 4,
  },
  {
    name: "menu5",
    id: 5,
  },
];

const listDaftar = [
  {
    name: "user name",
    id: "1",
  },
  {
    name: "email",
    id: "2",
  },
  {
    name: "password",
    id: 3,
  },
];

export default function MyMain() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [name, setusername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [listDataUser, setlistDatauser] = useState<any[]>([]);

  useShallowEffect(() => {
    loadUser();
  }, []);

  const loadUser = () => {
    fetch("/api/get-user")
      .then((v) => v.json())
      .then((v) => {
        setlistDatauser(v);
      });
  };

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section>
            {listmenu.map((v) => (
              <NavLink label={v.name} key={v.id.toString()} />
            ))}
          </Navbar.Section>
        </Navbar>
      }
      //   aside={
      //     <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      //       <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //         <Text>Application sidebar</Text>
      //       </Aside>
      //     </MediaQuery>
      //   }
      //   footer={
      //     <Footer height={60} p="md">
      //       Application footer
      //     </Footer>
      //   }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
          </div>
        </Header>
      }
    >
      <Group>
        <Paper p={"md"}>
          <Flex direction={"row"}>
            <Stack>
              <TextInput
                label={"username"}
                onChange={(val) => setusername(val.currentTarget.value)}
              />
              <TextInput
                label={"email"}
                onChange={(val) => setEmail(val.currentTarget.value)}
              />
              <TextInput
                onChange={(val) => setPassword(val.currentTarget.value)}
                label={"password"}
              />
              <Button
                onClick={async () => {
                  const body = {
                    name,
                    email,
                    password,
                  };

                  const res = await fetch("/api/pendaftaran", {
                    method: "POST",
                    body: JSON.stringify(body),
                  });

                  if (res.status == 201) {
                    console.log("success");
                    loadUser();
                  }
                }}
              >
                Daftar
              </Button>
            </Stack>
            <Box>
              {listDataUser.map((v) => (
                <Text color={"green"} key={v.id}>
                  {v.name}
                </Text>
              ))}
            </Box>
          </Flex>
        </Paper>
      </Group>
    </AppShell>
  );
}

export const cssApa = `padding: 40px`;
