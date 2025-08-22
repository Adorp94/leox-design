"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Search, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function CobranzaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("todos")
  const [fromDate, setFromDate] = useState<Date>()
  const [toDate, setToDate] = useState<Date>()

  // Sample data for the cobranza table
  const cobranzaData = [
    {
      id: 1,
      cliente: "Juan Pérez",
      numero: "001",
      unidad: "A-101",
      concepto: "Mensualidad Enero",
      monto: 15000,
      fecha: "2024-01-15",
      estado: "pagado",
    },
    {
      id: 2,
      cliente: "María García",
      numero: "002",
      unidad: "B-205",
      concepto: "Mensualidad Febrero",
      monto: 18000,
      fecha: "2024-02-10",
      estado: "pendiente",
    },
    {
      id: 3,
      cliente: "Carlos López",
      numero: "003",
      unidad: "C-301",
      concepto: "Mensualidad Marzo",
      monto: 40000,
      fecha: "2024-01-20",
      estado: "vencido",
    },
    {
      id: 4,
      cliente: "Ana Martínez",
      numero: "004",
      unidad: "A-102",
      concepto: "Mensualidad Abril",
      monto: 22000,
      fecha: "2024-04-05",
      estado: "pagado",
    },
    {
      id: 5,
      cliente: "Roberto Silva",
      numero: "005",
      unidad: "D-401",
      concepto: "Mensualidad Mayo",
      monto: 25000,
      fecha: "2024-05-12",
      estado: "pendiente",
    },
  ]

  const filteredData = cobranzaData.filter((item) => {
    const matchesSearch =
      item.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.concepto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.unidad.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab = activeTab === "todos" || item.estado === activeTab

    const itemDate = new Date(item.fecha)
    const matchesDateRange = (!fromDate || itemDate >= fromDate) && (!toDate || itemDate <= toDate)

    return matchesSearch && matchesTab && matchesDateRange
  })

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "pagado":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
            Pagado
          </Badge>
        )
      case "pendiente":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pendiente
          </Badge>
        )
      case "vencido":
        return <Badge variant="destructive">Vencido</Badge>
      default:
        return <Badge variant="outline">{estado}</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount)
  }

  const clearDateRange = () => {
    setFromDate(undefined)
    setToDate(undefined)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Finanzas</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Cobranza</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Cobranza</h1>
            <p className="text-muted-foreground">Gestiona y monitorea todos los pagos de tus proyectos</p>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Cobrado</CardTitle>
                <div className="h-4 w-4 text-green-600">💰</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">$153,629,833</div>
                <p className="text-xs text-muted-foreground">1546 pagos completados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendiente</CardTitle>
                <div className="h-4 w-4 text-yellow-600">⏳</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">$170,808,602</div>
                <p className="text-xs text-muted-foreground">106 pagos pendientes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vencidos</CardTitle>
                <div className="h-4 w-4 text-red-600">⚠️</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">1</div>
                <p className="text-xs text-muted-foreground">$40,000 vencidos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Registro de Cobranza</CardTitle>
                <div className="h-4 w-4 text-blue-600">📊</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">1652</div>
                <p className="text-xs text-muted-foreground">registros de pago</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar pagos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>

              {/* Date Range Selector */}
              <div className="flex items-center space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal", !fromDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fromDate ? format(fromDate, "dd/MM/yyyy", { locale: es }) : "Fecha desde"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={fromDate} onSelect={setFromDate} initialFocus locale={es} />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal", !toDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {toDate ? format(toDate, "dd/MM/yyyy", { locale: es }) : "Fecha hasta"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={toDate} onSelect={setToDate} initialFocus locale={es} />
                  </PopoverContent>
                </Popover>

                {(fromDate || toDate) && (
                  <Button variant="ghost" size="sm" onClick={clearDateRange}>
                    Limpiar
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Tabs and Table */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="pagado">Pagados</TabsTrigger>
              <TabsTrigger value="pendiente">Pendientes</TabsTrigger>
              <TabsTrigger value="vencido">Vencidos</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Registros de Cobranza</CardTitle>
                  <CardDescription>Lista completa de todos los pagos y su estado actual</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>#</TableHead>
                        <TableHead>Unidad</TableHead>
                        <TableHead>Concepto</TableHead>
                        <TableHead>Monto</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.cliente}</TableCell>
                          <TableCell>{item.numero}</TableCell>
                          <TableCell>{item.unidad}</TableCell>
                          <TableCell>{item.concepto}</TableCell>
                          <TableCell>{formatCurrency(item.monto)}</TableCell>
                          <TableCell>{format(new Date(item.fecha), "dd/MM/yyyy", { locale: es })}</TableCell>
                          <TableCell>{getStatusBadge(item.estado)}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver detalles
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
