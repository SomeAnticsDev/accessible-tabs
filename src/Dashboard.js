/* eslint-disable jsx-a11y/role-supports-aria-props */
import * as React from "react";
import { VisuallyHidden } from "@reach/visually-hidden";
import { Flex } from "./Layout";
import {
  Table,
  TableHead,
  TableHeadCell,
  TableHeadRow,
  TableBody,
  TableRow,
  TableCell,
} from "./Table";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "./Tabs";
import { FULFILLED_ORDERS, PENDING_ORDERS } from "./data";

export function Dashboard() {
  return (
    <Flex as="main" direction="column" gap={2}>
      <h1>Dashboard</h1>
      <Orders />
    </Flex>
  );
}

function Orders() {
  return (
    <Flex as="section" direction="column" gap={2} className="Orders">
      <h2>Order History</h2>
      <div className="Tabs">
        <div className="Tabs__tablist">
          <div data-selected className="Tabs__tab">
            All<VisuallyHidden> Orders</VisuallyHidden>
          </div>
          <div className="Tabs__tab">
            Pending<VisuallyHidden> Orders</VisuallyHidden>
          </div>
          <div className="Tabs__tab">
            Fulfilled<VisuallyHidden> Orders</VisuallyHidden>
          </div>
        </div>
        <div className="Tabs__panels">
          <div className="Tabs__panel">
            <Flex direction="column" gap={1}>
              <h4 id="heading-all">All Orders</h4>
              <OrderList
                aria-labelledby="heading-all"
                orders={[].concat(FULFILLED_ORDERS, PENDING_ORDERS)}
              />
            </Flex>
          </div>
          <div className="Tabs__panel" hidden>
            <Flex direction="column" gap={1}>
              <h4 id="heading-pending">Pending Orders</h4>
              <OrderList
                aria-labelledby="heading-pending"
                orders={PENDING_ORDERS}
              />
            </Flex>
          </div>
          <div className="Tabs__panel" hidden>
            <Flex direction="column" gap={1}>
              <h4 id="heading-fulfilled">Fulfilled Orders</h4>
              <OrderList
                aria-labelledby="heading-fulfilled"
                orders={FULFILLED_ORDERS}
              />
            </Flex>
          </div>
        </div>
      </div>
    </Flex>
  );
}

function OrderList({
  "aria-label": label,
  "aria-labelledby": labelledBy,
  orders,
}) {
  return (
    <Table aria-label={label} aria-labelledby={labelledBy}>
      <TableHead>
        <TableHeadRow>
          <TableHeadCell>Order Name</TableHeadCell>
          <TableHeadCell textAlign="right">Order Type</TableHeadCell>
        </TableHeadRow>
      </TableHead>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.name}</TableCell>
            <TableCell textAlign="right">{order.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
