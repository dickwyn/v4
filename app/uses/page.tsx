import { Fragment } from 'react';

import { uses } from './uses';

export default function Uses() {
  const ItemList = ({ items, parentIndex }) => (
    <ul>
      {items.map((item, itemIndex) => (
        <Fragment key={`item${itemIndex}`}>
          <li key={`parent${parentIndex}-item${itemIndex}`}>
            {item.url ? <a href={item.url}>{item.name}</a> : item.name}
            {item.attributeList && (
              <ul>
                {item.attributeList.map((attribute, attributeIndex) => (
                  <li key={`parent${parentIndex}-item${itemIndex}-attribute${attributeIndex}`}>
                    {attribute.url ? <a href={attribute.url}>{attribute.name}</a> : attribute.name}
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
    <div className="content-container with-padding">
      <p>
        From casual web browsing to creating content for YouTube, here&apos;s a comprehensive list
        of hardware and software that I use on a daily basis to create and consume content.
      </p>
      <p>I enjoy trying out new things so this list will be updated accordingly.</p>
      {uses.map((section, sectionIndex) => (
        <Fragment key={`section${sectionIndex}`}>
          <h2 className="section">{section.name}</h2>
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
