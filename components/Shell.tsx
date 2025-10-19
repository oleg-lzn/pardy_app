'use client';
import { useState, useCallback } from 'react';
import Side from './Side';
import Nav from './Nav';
import { Button } from '@nextui-org/react';
import { Menu, X } from 'lucide-react';

const Shell = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="flex w-screen h-screen">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-[200px] min-w-[200px] max-w-[200px] h-full 
        border-r border-default-50 bg-background
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
      >
        <div className="flex items-center justify-between p-4 lg:hidden">
          <Button isIconOnly variant="ghost" size="sm" onClick={handleClose}>
            <X size={16} />
          </Button>
        </div>
        <Side onClose={handleClose} />
      </aside>

      {/* Main content */}
      <div className="w-full lg:w-[calc(100vw-200px)] flex flex-col">
        <Nav onMenuClick={() => setSidebarOpen(true)} />
        <main className="h-[calc(100vh-65px)] overflow-hidden">{children}</main>
      </div>
    </div>
  );
};

export default Shell;
