"use client";

import { Text } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Step {
  number: number;
  description: string;
  rule: string;
  conversions?: string[];
  result?: boolean;
  currentX?: unknown;
  currentY?: unknown;
}

interface ComparisonResult {
  finalResult: boolean;
  steps: Step[];
}

const presetExamples = [
  { left: "[]", right: "![]", label: "[] == ![]" },
  { left: '"5"', right: "5", label: '"5" == 5' },
  { left: "true", right: "1", label: "true == 1" },
  { left: '""', right: "0", label: '"" == 0' },
  { left: "null", right: "undefined", label: "null == undefined" },
  { left: '"\\t\\r\\n"', right: "0", label: '"\\t\\r\\n" == 0' },
  { left: "[,,,]", right: '",,,"', label: '[,,,] == ",,,"' },
];

export function InteractiveEqualityExplorer() {
  const [leftInput, setLeftInput] = useState("[]");
  const [rightInput, setRightInput] = useState("![]");
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Parse user input to JavaScript value
  const parseInput = (inputString: string): unknown => {
    const trimmed = inputString.trim();

    // Handle special cases
    if (trimmed === "null") return null;
    if (trimmed === "undefined") return undefined;
    if (trimmed === "true") return true;
    if (trimmed === "false") return false;

    // Handle strings (quoted)
    if (
      (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
      return trimmed.slice(1, -1);
    }

    // Handle numbers
    if (!isNaN(Number(trimmed)) && trimmed !== "") {
      return Number(trimmed);
    }

    // Handle arrays and objects
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        return eval(trimmed);
      } catch {
        throw new Error(`Invalid array syntax: ${trimmed}`);
      }
    }

    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      try {
        return eval(trimmed);
      } catch {
        throw new Error(`Invalid object syntax: ${trimmed}`);
      }
    }

    // Handle expressions like ![]
    if (trimmed.startsWith("!")) {
      try {
        return eval(trimmed);
      } catch {
        throw new Error(`Invalid expression: ${trimmed}`);
      }
    }

    // If not quoted and not a number, treat as string
    return trimmed;
  };

  // Format value for display
  const formatValue = (value: unknown): string => {
    if (value === null) return "null";
    if (value === undefined) return "undefined";
    if (typeof value === "string") return `"${value}"`;
    if (typeof value === "boolean") return value.toString();
    if (typeof value === "number") return value.toString();
    if (Array.isArray(value)) return `[${value.map(formatValue).join(", ")}]`;
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  // Get type name for display
  const getTypeName = (value: unknown): string => {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    return typeof value;
  };

  // Object to primitive conversion
  const toPrimitive = (obj: unknown): string | number => {
    if (Array.isArray(obj)) {
      if (obj.length === 0) return "";
      return obj.join(",");
    }
    if (typeof obj === "object" && obj !== null) {
      return "[object Object]";
    }
    return obj;
  };

  // Abstract equality comparison algorithm (ECMAScript 7.2.15)
  const abstractEqualityComparison = (
    x: unknown,
    y: unknown,
    startStepNumber: number = 1,
  ): ComparisonResult => {
    const steps: Step[] = [];
    let stepNumber = startStepNumber;

    // Step 1: If SameType(x, y) is true, return IsStrictlyEqual(x, y)
    if (typeof x === typeof y) {
      // Handle null specially since typeof null === "object"
      if (x === null && y === null) {
        steps.push({
          number: stepNumber++,
          description: "Both operands are null",
          rule: "Same types - use strict equality comparison",
          result: true,
          currentX: x,
          currentY: y,
        });
        return { finalResult: true, steps };
      }

      if (typeof x !== "object" || x === null || y === null) {
        steps.push({
          number: stepNumber++,
          description: `Both operands are of type ${getTypeName(x)}`,
          rule: "Same types - use strict equality comparison",
          result: x === y,
          currentX: x,
          currentY: y,
        });
        return { finalResult: x === y, steps };
      }
    }

    // Step 2: If x is null and y is undefined, return true
    if (x === null && y === undefined) {
      steps.push({
        number: stepNumber++,
        description: "x is null and y is undefined",
        rule: "null == undefined → true (spec rule 2)",
        result: true,
        currentX: x,
        currentY: y,
      });
      return { finalResult: true, steps };
    }

    // Step 3: If x is undefined and y is null, return true
    if (x === undefined && y === null) {
      steps.push({
        number: stepNumber++,
        description: "x is undefined and y is null",
        rule: "undefined == null → true (spec rule 3)",
        result: true,
        currentX: x,
        currentY: y,
      });
      return { finalResult: true, steps };
    }

    // Step 5: If x is a Number and y is a String, return IsLooselyEqual(x, ToNumber(y))
    if (typeof x === "number" && typeof y === "string") {
      const originalY = y;
      const convertedY = Number(y);
      steps.push({
        number: stepNumber++,
        description: `String "${originalY}" converted to number ${convertedY}`,
        rule: "Number vs String → convert string to number and compare recursively (spec rule 5)",
        conversions: [`"${originalY}" → ${convertedY}`],
        currentX: x,
        currentY: convertedY,
      });
      const recursiveResult = abstractEqualityComparison(
        x,
        convertedY,
        stepNumber,
      );
      return {
        finalResult: recursiveResult.finalResult,
        steps: [...steps, ...recursiveResult.steps],
      };
    }

    // Step 6: If x is a String and y is a Number, return IsLooselyEqual(ToNumber(x), y)
    if (typeof x === "string" && typeof y === "number") {
      const originalX = x;
      const convertedX = Number(x);
      steps.push({
        number: stepNumber++,
        description: `String "${originalX}" converted to number ${convertedX}`,
        rule: "String vs Number → convert string to number and compare recursively (spec rule 6)",
        conversions: [`"${originalX}" → ${convertedX}`],
        currentX: convertedX,
        currentY: y,
      });
      const recursiveResult = abstractEqualityComparison(
        convertedX,
        y,
        stepNumber,
      );
      return {
        finalResult: recursiveResult.finalResult,
        steps: [...steps, ...recursiveResult.steps],
      };
    }

    // Step 9: If x is a Boolean, return IsLooselyEqual(ToNumber(x), y)
    if (typeof x === "boolean") {
      const originalX = x;
      const convertedX = x ? 1 : 0;
      steps.push({
        number: stepNumber++,
        description: `Boolean ${originalX} converted to number ${convertedX}`,
        rule: "Boolean → convert to number and compare recursively (spec rule 9)",
        conversions: [`${originalX} → ${convertedX}`],
        currentX: convertedX,
        currentY: y,
      });
      const recursiveResult = abstractEqualityComparison(
        convertedX,
        y,
        stepNumber,
      );
      return {
        finalResult: recursiveResult.finalResult,
        steps: [...steps, ...recursiveResult.steps],
      };
    }

    // Step 10: If y is a Boolean, return IsLooselyEqual(x, ToNumber(y))
    if (typeof y === "boolean") {
      const originalY = y;
      const convertedY = y ? 1 : 0;
      steps.push({
        number: stepNumber++,
        description: `Boolean ${originalY} converted to number ${convertedY}`,
        rule: "Boolean → convert to number and compare recursively (spec rule 10)",
        conversions: [`${originalY} → ${convertedY}`],
        currentX: x,
        currentY: convertedY,
      });
      const recursiveResult = abstractEqualityComparison(
        x,
        convertedY,
        stepNumber,
      );
      return {
        finalResult: recursiveResult.finalResult,
        steps: [...steps, ...recursiveResult.steps],
      };
    }

    // Step 11: If x is String/Number/Symbol and y is Object, return IsLooselyEqual(x, ToPrimitive(y))
    if (
      (typeof x === "string" ||
        typeof x === "number" ||
        typeof x === "symbol") &&
      typeof y === "object" &&
      y !== null
    ) {
      const originalY = y;
      const convertedY = toPrimitive(y);
      steps.push({
        number: stepNumber++,
        description: `Object ${formatValue(originalY)} converted to primitive ${formatValue(convertedY)}`,
        rule: "Primitive vs Object → convert object to primitive and compare recursively (spec rule 11)",
        conversions: [`${formatValue(originalY)} → ${formatValue(convertedY)}`],
        currentX: x,
        currentY: convertedY,
      });
      const recursiveResult = abstractEqualityComparison(
        x,
        convertedY,
        stepNumber,
      );
      return {
        finalResult: recursiveResult.finalResult,
        steps: [...steps, ...recursiveResult.steps],
      };
    }

    // Step 12: If x is Object and y is String/Number/Symbol, return IsLooselyEqual(ToPrimitive(x), y)
    if (
      typeof x === "object" &&
      x !== null &&
      (typeof y === "string" || typeof y === "number" || typeof y === "symbol")
    ) {
      const originalX = x;
      const convertedX = toPrimitive(x);
      steps.push({
        number: stepNumber++,
        description: `Object ${formatValue(originalX)} converted to primitive ${formatValue(convertedX)}`,
        rule: "Object vs Primitive → convert object to primitive and compare recursively (spec rule 12)",
        conversions: [`${formatValue(originalX)} → ${formatValue(convertedX)}`],
        currentX: convertedX,
        currentY: y,
      });
      const recursiveResult = abstractEqualityComparison(
        convertedX,
        y,
        stepNumber,
      );
      return {
        finalResult: recursiveResult.finalResult,
        steps: [...steps, ...recursiveResult.steps],
      };
    }

    // Step 14: Return false (no rule applies)
    steps.push({
      number: stepNumber++,
      description: "No conversion rule applies",
      rule: "Return false (spec rule 14)",
      result: false,
      currentX: x,
      currentY: y,
    });

    return { finalResult: false, steps };
  };

  const handleCompare = () => {
    setError(null);
    try {
      const leftValue = parseInput(leftInput);
      const rightValue = parseInput(rightInput);
      const comparisonResult = abstractEqualityComparison(
        leftValue,
        rightValue,
      );
      setResult(comparisonResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid input");
      setResult(null);
    }
  };

  const handlePreset = (left: string, right: string) => {
    setLeftInput(left);
    setRightInput(right);
  };

  return (
    <Card className="p-6 space-y-1">
      <Text weight="semibold">
        Enter two values to see how the abstract equality operator (==) works
        step by step.
      </Text>

      {/* Input Interface */}
      <div className="flex flex-row gap-4 items-end">
        <div>
          <label htmlFor="left-input" className="text-sm font-medium">
            Left Operand
          </label>
          <Input
            id="left-input"
            value={leftInput}
            onChange={(e) => {
              setLeftInput(e.target.value);
              setResult(null);
              setError(null);
            }}
            placeholder="Enter value..."
            className="font-mono"
          />
        </div>
        <Text>{"=="}</Text>
        <div>
          <label htmlFor="right-input" className="text-sm font-medium">
            Right Operand
          </label>
          <Input
            id="right-input"
            value={rightInput}
            onChange={(e) => {
              setRightInput(e.target.value);
              setResult(null);
              setError(null);
            }}
            placeholder="Enter value..."
            className="font-mono"
          />
        </div>
        <Button onClick={handleCompare} className="font-mono">
          Compare
        </Button>
      </div>
      <div>
        <Text variant="muted">Quick examples:</Text>
        <div className="flex flex-wrap gap-2">
          {presetExamples.map((example, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handlePreset(example.left, example.right)}
              className="font-mono text-xs"
            >
              {example.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <Text className="text-red-700 text-sm">{error}</Text>
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div className="space-y-4">
          <div className="p-4 bg-foreground/5 rounded-lg">
            <Text className="font-mono text-lg">
              {formatValue(parseInput(leftInput))} =={" "}
              {formatValue(parseInput(rightInput))} →{" "}
              <Badge variant={result.finalResult ? "default" : "secondary"}>
                {result.finalResult.toString()}
              </Badge>
            </Text>
          </div>

          <div className="space-y-3">
            <Text className="font-semibold">Step-by-step breakdown:</Text>
            {result.steps.map((step) => (
              <div
                key={step.number}
                className="p-3 border rounded-md space-y-2"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Step {step.number}
                  </Badge>
                  <Text className="text-sm font-medium">
                    {step.description}
                  </Text>
                </div>
                <Text className="text-sm text-gray-600">{step.rule}</Text>
                {(step.currentX !== undefined ||
                  step.currentY !== undefined) && (
                  <div className="text-sm">
                    <Text className="text-gray-600">Current values:</Text>
                    <div className="font-mono text-xs ml-2">
                      x = {formatValue(step.currentX)}, y ={" "}
                      {formatValue(step.currentY)}
                    </div>
                  </div>
                )}
                {step.conversions && (
                  <div className="text-sm">
                    <Text className="text-gray-600">Conversions:</Text>
                    <ul className="list-disc list-inside ml-2">
                      {step.conversions.map((conv, idx) => (
                        <li key={idx} className="font-mono text-xs">
                          {conv}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {step.result !== undefined && (
                  <div className="flex items-center gap-2">
                    <Text className="text-sm text-gray-600">Result:</Text>
                    <Badge
                      variant={step.result ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {step.result.toString()}
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
