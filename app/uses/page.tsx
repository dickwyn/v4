import { Fragment } from 'react';
import Link from 'next/link';

import { uses } from './uses';

export default function Uses() {
  const ItemList = ({ items, parentIndex }) => (
    <ul className="list-disc pl-5">
      {items.map((item, itemIndex) => (
        <Fragment key={`item${itemIndex}`}>
          <li key={`parent${parentIndex}-item${itemIndex}`} className="mb-2">
            {item.url ? <Link href={item.url}>{item.name}</Link> : item.name}
            {item.attributeList && (
              <ul className="list-disc pl-5">
                {item.attributeList.map((attribute, attributeIndex) => (
                  <li
                    key={`parent${parentIndex}-item${itemIndex}-attribute${attributeIndex}`}
                    className="mb-1"
                  >
                    {attribute.url ? (
                      <Link href={attribute.url}>{attribute.name}</Link>
                    ) : (
                      attribute.name
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        </Fragment>
      ))}
    </ul>
  );

  const sortList = (list) => {
    return list.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
  };

  return (
    <div className="flex flex-col gap-y-3">
      <p>
        From casual web browsing to creating content for YouTube, here&apos;s a comprehensive list
        of hardware and software that I use on a daily basis to create and consume content.
      </p>
      <p>I enjoy trying out new things so this list will be updated accordingly.</p>
      {uses.map((section, sectionIndex) => (
        <Fragment key={`section${sectionIndex}`}>
          <h2 className="font-semibold text-2xl mt-5 mb-3 border-b-3">{section.name}</h2>
          <p>{section.description}</p>
          {section.categoryList &&
            section.categoryList.map((category, categoryIndex) => (
              <Fragment key={`category${categoryIndex}`}>
                <h3>{category.name}</h3>
                <ItemList
                  items={category.sort ? sortList(category.list) : category.list}
                  parentIndex={sectionIndex}
                />
              </Fragment>
            ))}
          {section.itemList && (
            <ItemList
              items={section.sort ? sortList(section.itemList) : section.itemList}
              parentIndex={sectionIndex}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
