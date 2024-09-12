import { Button, Flex } from "@radix-ui/themes";

export type TablePaginationProps = {
  hasPrevious: boolean;
  onPrevious: () => void;
  hasNext: boolean;
  onNext: () => void;
};

export const TablePagination = ({
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
}: TablePaginationProps) => (
  <Flex style={{ width: "100%" }} gap={"2"} justify={"end"}>
    <Button
      variant="surface"
      color="gray"
      disabled={!hasPrevious}
      onClick={onPrevious}
    >
      Previous
    </Button>
    <Button variant="surface" color="gray" disabled={!hasNext} onClick={onNext}>
      Next
    </Button>
  </Flex>
);
