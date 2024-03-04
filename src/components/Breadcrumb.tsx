import React from "react";

interface BreadcrumbItem {
  text: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.url ? (
              <a href={item.url} className=" hover:text-slate-700">
                {item.text}
              </a>
            ) : (
              <span>{item.text}</span>
            )}
            {index !== items.length - 1 && <p className="px-2">/</p>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
