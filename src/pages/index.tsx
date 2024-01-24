import styles from './index.module.css'
import { Box, Button, Center, Checkbox, Flex, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import AddButton from "./componets/AddButton";

export default function Home() {
  return (
    <>
      <Center mt={5}>
        <Box w="400px">
          <Heading size="md">2024年1月24日</Heading>
          <Box w="100%" bg="blackAlpha.50" p={5}>
            <Box>
              <Heading size="sm" mb={5}>未完了</Heading>
              <UnorderedList display="flex" flexDirection="column" gap={5}>
                <ListItem listStyleType="none">
                  <Checkbox>買い物に行く</Checkbox>
                </ListItem>
                <ListItem listStyleType="none">
                  <Checkbox>確定申告に行く</Checkbox>
                </ListItem>
                <ListItem listStyleType="none">
                  <Checkbox>ドットインストールを進める</Checkbox>
                </ListItem>
              </UnorderedList>
            </Box>
            <Box mt={5}>
              <Heading size="sm" mb={5}>完了</Heading>
              <UnorderedList display="flex" flexDirection="column" gap={5}>
                <ListItem listStyleType="none">
                  <Checkbox>Reactの復習</Checkbox>
                </ListItem>
                <ListItem listStyleType="none">
                  <Checkbox>Discordの招待</Checkbox>
                </ListItem>
                <ListItem listStyleType="none">
                  <Checkbox>MENTAでチャットの返信</Checkbox>
                </ListItem>
              </UnorderedList>
            </Box>
          </Box>
        </Box>
      </Center>

      <AddButton className={styles.addBtn} />
    </>
  )
}
