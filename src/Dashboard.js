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
      <Tabs defaultValue="all">
        <TabList>
          <Tab value="all">
            All<VisuallyHidden> Orders</VisuallyHidden>
          </Tab>
          <Tab value="pending">
            Pending<VisuallyHidden> Orders</VisuallyHidden>
          </Tab>
          <Tab value="fulfilled">
            Fulfilled<VisuallyHidden> Orders</VisuallyHidden>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="all">
            <Flex direction="column" gap={1}>
              <h4 id="heading-all">All Orders</h4>
              <OrderList
                aria-labelledby="heading-all"
                orders={[].concat(FULFILLED_ORDERS, PENDING_ORDERS)}
              />
            </Flex>
          </TabPanel>
          <TabPanel value="pending">
            <Flex direction="column" gap={1}>
              <h4 id="heading-pending">Pending Orders</h4>
              <OrderList
                aria-labelledby="heading-pending"
                orders={PENDING_ORDERS}
              />
            </Flex>
          </TabPanel>
          <TabPanel value="fulfilled">
            <Flex direction="column" gap={1}>
              <h4 id="heading-fulfilled">Fulfilled Orders</h4>
              <OrderList
                aria-labelledby="heading-fulfilled"
                orders={FULFILLED_ORDERS}
              />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
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
