import React from 'react';
import { 
  Users, 
  Calendar, 
  BarChart3, 
  Clock, 
  FileText, 
  MessageSquare 
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: 'Employee Management',
      description: 'Centralize employee records, documents, and important information in one secure location.',
      icon: <Users className="h-10 w-10 text-teal-600" />
    },
    {
      title: 'Attendance Tracking',
      description: 'Monitor work hours, breaks, and absences with automated time tracking and reporting.',
      icon: <Clock className="h-10 w-10 text-teal-600" />
    },
    {
      title: 'Performance Analytics',
      description: 'Analyze employee performance with customizable KPIs and detailed reports.',
      icon: <BarChart3 className="h-10 w-10 text-teal-600" />
    },
    {
      title: 'Leave Management',
      description: 'Streamline time-off requests with automated approvals and calendar integration.',
      icon: <Calendar className="h-10 w-10 text-teal-600" />
    },
    {
      title: 'Document Management',
      description: 'Create, store, and manage HR documents with version control and e-signatures.',
      icon: <FileText className="h-10 w-10 text-teal-600" />
    },
    {
      title: 'Internal Communication',
      description: 'Keep teams connected with integrated messaging and announcement tools.',
      icon: <MessageSquare className="h-10 w-10 text-teal-600" />
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-600 font-medium">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900">Everything you need to manage your team</h2>
          <p className="text-lg text-gray-600">
            Our comprehensive platform provides all the tools you need to streamline HR processes and boost productivity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4 p-3 bg-teal-50 inline-block rounded-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;