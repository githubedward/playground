import { Container } from "@/components/container";
import { Heading, Text } from "@/components/typography";
import { InlineCode } from "@/components/ui/inline-code";
import { List } from "@/components/ui/list";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EqualityOperators() {
  return (
    <Container className="mt-14 space-y-8">
      <div className="space-y-4">
        <Heading size="h2" as="h1" variant="default" weight="bold">
          Understanding JavaScript abstract equality
        </Heading>
        <Text variant="lead">
          It&apos;s common knowledge to use the strict equality operator{" "}
          <InlineCode>{"==="}</InlineCode> over the abstract equality operator{" "}
          <InlineCode>==</InlineCode>. I&apos;m not going to dive into{" "}
          <em>why</em> you should prefer <InlineCode>{"==="}</InlineCode>
          because there are plenty of explanations on that topic already.
        </Text>
      </div>

      <div className="space-y-8">
        {/* Introduction Section */}
        <section className="space-y-3">
          <Heading size="h4" as="h2">
            TL;DR:
          </Heading>
          <List variant="unordered">
            <li>
              <InlineCode>==</InlineCode> checks for equality between two values
              but performs type coercion
            </li>
            <li>
              <InlineCode>{"==="}</InlineCode> checks for both type and value
              equality (no coercion)
            </li>
          </List>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Operator</TableHead>
                <TableHead>Type Coercion</TableHead>
                <TableHead>Example</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Explanation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <InlineCode>==</InlineCode>
                </TableCell>
                <TableCell>Yes</TableCell>
                <TableCell>
                  <InlineCode>&quot;5&quot; == 5</InlineCode>
                </TableCell>
                <TableCell>
                  <InlineCode>true</InlineCode>
                </TableCell>
                <TableCell>String &quot;5&quot; converts to number 5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <InlineCode>{"==="}</InlineCode>
                </TableCell>
                <TableCell>No</TableCell>
                <TableCell>
                  <InlineCode>&quot;5&quot; {"==="} 5</InlineCode>
                </TableCell>
                <TableCell>
                  <InlineCode>false</InlineCode>
                </TableCell>
                <TableCell>Different types, no conversion</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <InlineCode>==</InlineCode>
                </TableCell>
                <TableCell>Yes</TableCell>
                <TableCell>
                  <InlineCode>[] == 0</InlineCode>
                </TableCell>
                <TableCell>
                  <InlineCode>true</InlineCode>
                </TableCell>
                <TableCell>Empty array converts to 0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <InlineCode>{"==="}</InlineCode>
                </TableCell>
                <TableCell>No</TableCell>
                <TableCell>
                  <InlineCode>[] {"==="} 0</InlineCode>
                </TableCell>
                <TableCell>
                  <InlineCode>false</InlineCode>
                </TableCell>
                <TableCell>Different types, no conversion</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Text>
            What I <em>am</em> curious about is understanding exactly what
            happens under the hood when <InlineCode>==</InlineCode> performs its
            type coercion magic. Let&apos;s explore the mechanics.
          </Text>
        </section>
      </div>
    </Container>
  );
}
