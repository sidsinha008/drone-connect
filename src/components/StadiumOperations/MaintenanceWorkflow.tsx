
import React, { useState } from "react";
import { Wrench, CheckCircle, Clock, Users, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MaintenanceWorkflow = () => {
  const maintenanceTasks = [
    {
      id: "MT-001",
      title: "Repair North Stand Beam Crack",
      description: "Critical structural repair identified by drone inspection",
      priority: "Critical",
      status: "Assigned",
      assignee: "Structural Team Alpha",
      dueDate: "2024-01-16",
      estimatedHours: 8,
      location: "North Stand - Section 12",
      sourceAnomalyId: "AN-001"
    },
    {
      id: "MT-002",
      title: "Replace Floodlight Electrical Connection",
      description: "Loose electrical connection repair",
      priority: "High",
      status: "In Progress",
      assignee: "Electrical Team Beta", 
      dueDate: "2024-01-17",
      estimatedHours: 4,
      location: "Floodlight Tower 3",
      sourceAnomalyId: "AN-002"
    },
    {
      id: "MT-003",
      title: "Clean Emergency Exit Signage",
      description: "Remove obstruction from exit sign",
      priority: "Low",
      status: "Pending",
      assignee: "Maintenance Crew",
      dueDate: "2024-01-18",
      estimatedHours: 1,
      location: "Emergency Exit 7",
      sourceAnomalyId: "AN-003"
    }
  ];

  const teams = [
    { name: "Structural Team Alpha", available: 3, occupied: 2, specialization: "Structural" },
    { name: "Electrical Team Beta", available: 2, occupied: 1, specialization: "Electrical" },
    { name: "Maintenance Crew", available: 5, occupied: 1, specialization: "General" },
    { name: "HVAC Specialists", available: 2, occupied: 0, specialization: "HVAC" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-700";
      case "High": return "bg-orange-100 text-orange-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Low": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Assigned": return "text-blue-600";
      case "In Progress": return "text-orange-600";
      case "Completed": return "text-green-600";
      case "Pending": return "text-gray-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Task Management */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Maintenance Task Management
              </CardTitle>
              <CardDescription>
                Tasks generated from drone inspection anomalies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active">
                <TabsList className="mb-4">
                  <TabsTrigger value="active">Active Tasks</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="space-y-4">
                  {maintenanceTasks.map((task) => (
                    <div key={task.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold">{task.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {task.description}
                          </p>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>Location: {task.location}</span>
                            <span>Due: {task.dueDate}</span>
                            <span>Est. {task.estimatedHours}h</span>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <p className={`text-sm font-medium ${getStatusColor(task.status)}`}>
                            {task.status}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Assigned to: {task.assignee}
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            Update Status
                          </Button>
                          <Button size="sm">
                            Complete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="completed">
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Completed Tasks</h3>
                    <p className="text-muted-foreground">
                      View completed maintenance tasks and compliance reports
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="analytics">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">24</div>
                      <div className="text-sm text-muted-foreground">Tasks This Month</div>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">18</div>
                      <div className="text-sm text-muted-foreground">Completed On Time</div>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-yellow-600">4.2</div>
                      <div className="text-sm text-muted-foreground">Avg Hours/Task</div>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">92%</div>
                      <div className="text-sm text-muted-foreground">Completion Rate</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Resource Management */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Allocation
              </CardTitle>
              <CardDescription>
                Current team availability and assignments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teams.map((team, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{team.name}</h4>
                      <p className="text-sm text-muted-foreground">{team.specialization}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Available:</span>
                      <span className="text-green-600">{team.available}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Occupied:</span>
                      <span className="text-orange-600">{team.occupied}</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-2" variant="outline">
                    Assign Task
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Compliance & Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Generate Inspection Report
              </Button>
              <Button className="w-full" variant="outline">
                <CheckCircle className="w-4 h-4 mr-2" />
                Compliance Audit Trail
              </Button>
              <Button className="w-full" variant="outline">
                <Clock className="w-4 h-4 mr-2" />
                Maintenance Schedule
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Task Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">3</div>
                  <div className="text-sm text-red-700">Critical</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">5</div>
                  <div className="text-sm text-orange-700">In Progress</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">8</div>
                  <div className="text-sm text-blue-700">Pending</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-sm text-green-700">Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceWorkflow;
