import PingPong from "./pingpong";
import Dice from "./dice";
/**
 * To register a command, add it to this array.
 */

const commands: Command[] = [PingPong, Dice];

/**
 * Types and message handling.
 */

export type Message = {
  content: string;
  channel: any;
};

export type CommandDefinition = {
  name: string; // Ex: "Dice Rollin' Bot"
  description: string; // Ex: "Roll a die with any sides, default is 6."
  usage: string; // Ex: "!roll <number of sides>"
  key: string; // Ex: "roll"
};

export type Command = {
  definition: CommandDefinition;
  action: (message: Message) => void;
};

export function extractKey(content: string): string {
  const start = content.split(" ")[0];
  const key = start.replace("!", "");
  console.log(`Key is ${key}`);
  return key;
}

export async function handleMessage<Promise>(message: Message) {
  console.log(`Handling message ${message.content}`);
  const key = extractKey(message.content);
  if (!key) return; // Return early if key is empty.
  commands.forEach((c) => {
    if (c.definition.key === key) {
      console.log(`Running the ${c.definition.name} command.`);
      c.action(message);
    }
  });
}
