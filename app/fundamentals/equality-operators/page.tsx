import { Container } from "@/components/container";
import { InteractiveEqualityExplorer } from "@/components/interactive-equality-explorer";
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
import Link from "next/link";

export default function EqualityOperators() {
  return (
    <Container className="my-14 space-y-8">
      <div className="space-y-4">
        <Heading size="h2" as="h1" variant="default" weight="bold">
          Understanding JavaScript abstract equality
        </Heading>
        <Text variant="lead">
          It&apos;s common knowledge to use the strict equality operator{" "}
          <InlineCode>{"==="}</InlineCode> over the abstract equality operator{" "}
          <InlineCode>==</InlineCode>. I&apos;m not going to dive into{" "}
          <em>why</em> you should prefer <InlineCode>{"==="}</InlineCode>{" "}
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

        <section className="space-y-3">
          <Heading size="h4" as="h2">
            Understanding the ECMAScript Algorithm
          </Heading>

          <Text>
            The magic behind <InlineCode>==</InlineCode> follows a precise
            algorithm defined in the{" "}
            <Link
              href="https://tc39.es/ecma262/#sec-abstract-equality-comparison"
              target="_blank"
              className="underline"
              aria-label="View ECMAScript specification"
            >
              ECMAScript specification
            </Link>
            . Here are the key rules that govern type coercion:
          </Text>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule</TableHead>
                <TableHead>Examples</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  Same types - when both operands are the same type,{" "}
                  <InlineCode>==</InlineCode> behaves exactly like{" "}
                  <InlineCode>{"==="}</InlineCode>
                </TableCell>
                <TableCell>
                  <InlineCode>5 == 5</InlineCode> → Direct comparison, no
                  coercion needed
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  null and undefined - these have special treatment
                </TableCell>
                <TableCell>
                  <List variant="unordered">
                    <li>
                      <InlineCode>null == undefined</InlineCode> → Always true
                      (spec rule)
                    </li>
                    <li>
                      null and undefined only equal each other, nothing else
                    </li>
                  </List>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Boolean conversion - booleans always convert to numbers first
                </TableCell>
                <TableCell>
                  <List variant="unordered">
                    <li>true becomes 1</li>
                    <li>false becomes 0</li>
                    <li>Then the comparison continues with the new number</li>
                  </List>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  String vs Number - when comparing strings and numbers, strings
                  convert to numbers
                </TableCell>
                <TableCell>
                  <List variant="unordered">
                    <li>
                      <InlineCode>&quot;5&quot; == 5</InlineCode> →
                      Number(&quot;5&quot;) = 5 → 5 == 5 → true
                    </li>
                    <li>
                      <InlineCode>&quot;hello&quot; == 5</InlineCode> →
                      Number(&quot;hello&quot;) = NaN → NaN == 5 → false
                    </li>
                  </List>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Object to Primitive - objects convert to primitives
                </TableCell>
                <TableCell>
                  <List variant="unordered">
                    <li>Arrays: [] → &quot;&quot; (empty string)</li>
                    <li>Objects: {} → &quot;[object Object]&quot;</li>
                    <li>
                      Then the comparison continues with the primitive value
                    </li>
                  </List>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>

        {/* Interactive Explorer Section */}
        <section className="space-y-3">
          <Heading size="h4" as="h2">
            Interactive Equality Explorer
          </Heading>

          <Text>
            Try it yourself! Enter two values below to see exactly how the
            abstract equality operator works step by step, following the
            ECMAScript algorithm.
          </Text>

          <InteractiveEqualityExplorer />
        </section>
      </div>
    </Container>
  );
}
