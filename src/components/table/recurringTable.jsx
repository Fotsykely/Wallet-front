import { BaseTable } from "@/components/ui/BaseTable";

export function RecurringTable(props) {
  const columns = [
    { key: 'description', label: 'DESCRIPTION', colSpan: 3 },
    { key: 'type', label: 'TYPE', colSpan: 2 },
    { key: 'amount', label: 'AMOUNT', colSpan: 2 },
    { key: 'recurrence', label: 'RECURRENCE', colSpan: 2 },
    { key: 'recurrence_date', label: 'RECURRENCE DATE', colSpan: 2 },
  ];
  return <BaseTable {...props} columns={columns} />;
}