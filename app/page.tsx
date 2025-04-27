"use client"

import { useState } from "react"
import { BarChart, Bell, Calendar, Car, ChevronDown, DollarSign, Home, Search, Settings, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data adapted for Qatar
const customers = [
  { id: 1, name: "Mohammed Al-Thani", phone: "+974 3344 5566", car: "Lexus LX570", plate: "12345 | دوحة" },
  { id: 2, name: "Fatima Al-Mansouri", phone: "+974 5566 7788", car: "Nissan Patrol", plate: "67890 | دوحة" },
  { id: 3, name: "Ahmed Al-Kuwari", phone: "+974 7788 9900", car: "Toyota Land Cruiser", plate: "24680 | دوحة" },
  { id: 4, name: "Noor Al-Sulaiti", phone: "+974 1122 3344", car: "Mercedes G-Class", plate: "13579 | دوحة" },
  { id: 5, name: "Khalid Al-Attiyah", phone: "+974 9900 1122", car: "Range Rover", plate: "98765 | دوحة" },
]

const todaysWashes = [
  { id: 1, customer: "Mohammed Al-Thani", car: "Lexus LX570", time: "9:00 AM", status: "Completed", worker: "Hamad" },
  {
    id: 2,
    customer: "Fatima Al-Mansouri",
    car: "Nissan Patrol",
    time: "10:30 AM",
    status: "In Progress",
    worker: "Aisha",
  },
  {
    id: 3,
    customer: "Ahmed Al-Kuwari",
    car: "Toyota Land Cruiser",
    time: "11:45 AM",
    status: "Pending",
    worker: "Unassigned",
  },
  {
    id: 4,
    customer: "Noor Al-Sulaiti",
    car: "Mercedes G-Class",
    time: "1:15 PM",
    status: "Pending",
    worker: "Unassigned",
  },
  {
    id: 5,
    customer: "Khalid Al-Attiyah",
    car: "Range Rover",
    time: "3:00 PM",
    status: "Pending",
    worker: "Unassigned",
  },
]

const workers = [
  { id: 1, name: "Hamad", washesCompleted: 15 },
  { id: 2, name: "Aisha", washesCompleted: 12 },
  { id: 3, name: "Rashid", washesCompleted: 10 },
  { id: 4, name: "Omar", washesCompleted: 8 },
]

// First, add the mock data for reports after the workers array
const revenueData = [
  { day: "Monday", revenue: 1200 },
  { day: "Tuesday", revenue: 1500 },
  { day: "Wednesday", revenue: 1800 },
  { day: "Thursday", revenue: 1300 },
  { day: "Friday", revenue: 2200 },
  { day: "Saturday", revenue: 2500 },
  { day: "Sunday", revenue: 1700 },
]

const serviceBreakdown = [
  { service: "Basic Wash", count: 25, revenue: 2500 },
  { service: "Premium Wash", count: 15, revenue: 2250 },
  { service: "Deluxe Wash", count: 10, revenue: 2000 },
  { service: "Interior Detailing", count: 8, revenue: 2400 },
  { service: "Full Detailing", count: 5, revenue: 2500 },
]

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  // Calculate summary statistics
  const totalWashes = todaysWashes.length
  const completedWashes = todaysWashes.filter((wash) => wash.status === "Completed").length
  const inProgressWashes = todaysWashes.filter((wash) => wash.status === "In Progress").length
  const pendingWashes = todaysWashes.filter((wash) => wash.status === "Pending").length

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-white p-4 md:flex">
        <div className="flex items-center gap-2 py-4">
          <Car className="h-6 w-6 text-maroon-600" />
          <h1 className="text-xl font-bold text-maroon-600">WeClean</h1>
        </div>
        <nav className="mt-8 flex flex-col gap-2">
          <Button
            variant="ghost"
            className="justify-start gap-2 text-maroon-600"
            onClick={() => setSelectedTab("overview")}
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Button>
          <Button variant="ghost" className="justify-start gap-2" onClick={() => setSelectedTab("customers")}>
            <Users className="h-5 w-5" />
            Customers
          </Button>
          <Button variant="ghost" className="justify-start gap-2" onClick={() => setSelectedTab("schedule")}>
            <Calendar className="h-5 w-5" />
            Schedule
          </Button>
          <Button variant="ghost" className="justify-start gap-2" onClick={() => setSelectedTab("billing")}>
            <DollarSign className="h-5 w-5" />
            Billing
          </Button>
          <Button variant="ghost" className="justify-start gap-2" onClick={() => setSelectedTab("reports")}>
            <BarChart className="h-5 w-5" />
            Reports
          </Button>
          <Button variant="ghost" className="justify-start gap-2" onClick={() => setSelectedTab("settings")}>
            <Settings className="h-5 w-5" />
            Settings
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center border-b bg-white px-6">
          <Button variant="outline" size="icon" className="md:hidden">
            <ChevronDown className="h-4 w-4" />
          </Button>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-[200px] pl-8 md:w-[300px]" />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  Admin
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-maroon-600">Car Wash Management</h2>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="customers">Customers</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Summary Cards */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Washes Today</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-maroon-600">{totalWashes}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">{completedWashes}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-amber-500">{inProgressWashes}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-red-500">{pendingWashes}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Today's Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-maroon-600">Today's Wash Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Car</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Worker</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {todaysWashes.map((wash) => (
                        <TableRow key={wash.id}>
                          <TableCell>{wash.customer}</TableCell>
                          <TableCell>{wash.car}</TableCell>
                          <TableCell>{wash.time}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                wash.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : wash.status === "In Progress"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {wash.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {wash.worker === "Unassigned" ? (
                              <Select>
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="Assign" />
                                </SelectTrigger>
                                <SelectContent>
                                  {workers.map((worker) => (
                                    <SelectItem key={worker.id} value={worker.name}>
                                      {worker.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              wash.worker
                            )}
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" className="text-maroon-600">
                              {wash.status === "Completed" ? "Invoice" : "Update"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Worker Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-maroon-600">Worker Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {workers.map((worker) => (
                      <div key={worker.id} className="flex items-center gap-4">
                        <div className="w-24 font-medium">{worker.name}</div>
                        <div className="flex-1">
                          <div className="h-4 w-full overflow-hidden rounded-full bg-blue-100">
                            <div
                              className="h-full bg-maroon-600"
                              style={{ width: `${(worker.washesCompleted / 20) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="w-16 text-right font-medium">{worker.washesCompleted} washes</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Customers Tab */}
            <TabsContent value="customers" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-maroon-600">Customer List</CardTitle>
                  <Button className="bg-maroon-600 hover:bg-maroon-700">Add Customer</Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Car Model</TableHead>
                        <TableHead>License Plate</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell>{customer.phone}</TableCell>
                          <TableCell>{customer.car}</TableCell>
                          <TableCell>{customer.plate}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="text-maroon-600">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="text-maroon-600">
                                Schedule
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-maroon-600">Today's Schedule</CardTitle>
                  <Button className="bg-maroon-600 hover:bg-maroon-700">New Appointment</Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Car</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Worker</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {todaysWashes.map((wash) => (
                        <TableRow key={wash.id}>
                          <TableCell>{wash.customer}</TableCell>
                          <TableCell>{wash.car}</TableCell>
                          <TableCell>{wash.time}</TableCell>
                          <TableCell>
                            <Select defaultValue={wash.status.toLowerCase()}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Select defaultValue={wash.worker === "Unassigned" ? "" : wash.worker.toLowerCase()}>
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Assign" />
                              </SelectTrigger>
                              <SelectContent>
                                {workers.map((worker) => (
                                  <SelectItem key={worker.id} value={worker.name.toLowerCase()}>
                                    {worker.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" className="text-maroon-600">
                              Save
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-maroon-600">Billing & Invoices</CardTitle>
                  <Button className="bg-maroon-600 hover:bg-maroon-700">Create Invoice</Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice #</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Service Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">INV-001</TableCell>
                        <TableCell>Mohammed Al-Thani</TableCell>
                        <TableCell>Today, 9:00 AM</TableCell>
                        <TableCell>QAR 100</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Paid</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="text-maroon-600">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV-002</TableCell>
                        <TableCell>Fatima Al-Mansouri</TableCell>
                        <TableCell>Today, 10:30 AM</TableCell>
                        <TableCell>QAR 150</TableCell>
                        <TableCell>
                          <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="text-maroon-600">
                              View
                            </Button>
                            <Button size="sm" className="bg-maroon-600 hover:bg-maroon-700">
                              Send
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV-003</TableCell>
                        <TableCell>Ahmed Al-Kuwari</TableCell>
                        <TableCell>Today, 11:45 AM</TableCell>
                        <TableCell>QAR 200</TableCell>
                        <TableCell>
                          <Badge className="bg-red-100 text-red-800">Draft</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="text-maroon-600">
                              Edit
                            </Button>
                            <Button size="sm" className="bg-maroon-600 hover:bg-maroon-700">
                              Finalize
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-maroon-600">Weekly Revenue Report</CardTitle>
                  <Select defaultValue="this-week">
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="this-week">This Week</SelectItem>
                      <SelectItem value="last-week">Last Week</SelectItem>
                      <SelectItem value="this-month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-end gap-2 pt-6">
                        {revenueData.map((item) => (
                          <div key={item.day} className="group flex w-full flex-col items-center gap-2">
                            <div
                              className="w-full bg-maroon-600 transition-all group-hover:opacity-80"
                              style={{
                                height: `${(item.revenue / 2500) * 100}%`,
                                borderTopLeftRadius: "4px",
                                borderTopRightRadius: "4px",
                              }}
                            />
                            <span className="text-xs text-muted-foreground">{item.day.substring(0, 3)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Revenue</p>
                          <p className="text-2xl font-bold">
                            QAR {revenueData.reduce((acc, item) => acc + item.revenue, 0)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Average Daily</p>
                          <p className="text-2xl font-bold">
                            QAR {Math.round(revenueData.reduce((acc, item) => acc + item.revenue, 0) / 7)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-maroon-600">Service Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service Type</TableHead>
                        <TableHead>Count</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>% of Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {serviceBreakdown.map((service) => {
                        const totalRevenue = serviceBreakdown.reduce((acc, item) => acc + item.revenue, 0)
                        const percentage = ((service.revenue / totalRevenue) * 100).toFixed(1)

                        return (
                          <TableRow key={service.service}>
                            <TableCell className="font-medium">{service.service}</TableCell>
                            <TableCell>{service.count}</TableCell>
                            <TableCell>QAR {service.revenue}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="h-2.5 w-full max-w-24 overflow-hidden rounded-full bg-slate-100">
                                  <div className="h-full bg-maroon-600" style={{ width: `${percentage}%` }} />
                                </div>
                                <span>{percentage}%</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-maroon-600">Daily Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Cars Washed Today</p>
                      <p className="text-3xl font-bold">{completedWashes + inProgressWashes}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Today's Revenue</p>
                      <p className="text-3xl font-bold">QAR {(completedWashes * 150).toLocaleString()}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Worker Efficiency</p>
                      <p className="text-3xl font-bold">{Math.round((completedWashes / totalWashes) * 100)}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
