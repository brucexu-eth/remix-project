// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Fragment, useEffect, useRef } from 'react'
import { VerticalIcons } from '../../types/vertical-icons'

export interface VerticalIconsContextMenuProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  // actions: action[]
  pageX: number
  pageY: number
  profileName: string
  links: { Documentation: string, CanDeactivate: boolean }
  canBeDeactivated: boolean
  verticalIconPlugin: VerticalIcons
  hideContextMenu: () => void
  contextMenuAction: (evt: any, profileName: string, documentation: string) => void
}

interface MenuLinksProps {
  listItems: { Documentation: string, CanDeactivate: boolean }
  hide: (someEvent: any, value: boolean) => void
  profileName: string
  canBeDeactivated: boolean
  verticalIconPlugin: VerticalIcons
  ref?: React.MutableRefObject<any>
  toggle: (name: string) => void
  contextMenuAction: (evt: any, profileName: string, documentation: string) => void
}

interface MenuProps {
  verticalIconsPlugin: VerticalIcons
  profileName: string
  listItems: { Documentation: string, CanDeactivate: boolean }
  hide: (someEvent: any, value: boolean) => void
}

function VerticalIconsContextMenu (props: VerticalIconsContextMenuProps) {
  const menuRef = useRef(null)
  useEffect(() => {
    document.addEventListener('click', props.hideContextMenu)
    return () => document.removeEventListener('click', props.hideContextMenu)
  }, [])
  useEffect(() => {
    menuRef.current.focus()
  }, [])

  return (
    <div
      id="menuItemsContainer"
      className="p-1 remixui_verticalIconContextcontainer bg-light shadow border"
      onBlur={props.hideContextMenu}
      style={{
        left: props.pageX,
        top: props.pageY,
        display: 'block'

      }}
      ref={menuRef}
    >
      <ul id="menuitems">
        <MenuForLinks
          hide={props.hideContextMenu}
          listItems={props.links}
          profileName={props.profileName}
          canBeDeactivated={props.canBeDeactivated}
          verticalIconPlugin={props.verticalIconPlugin}
          toggle={props.verticalIconPlugin.toggle}
          contextMenuAction={props.contextMenuAction}
        />
      </ul>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MenuForLinks ({
  listItems,
  hide,
  profileName,
  contextMenuAction
}: MenuLinksProps) {
  return (
    <Fragment>
      {listItems.CanDeactivate &&
        <li
          id="menuitemdeactivate"
          onClick={(evt) => {
            contextMenuAction(evt, profileName, listItems.Documentation)
            hide()
          }}
          className="remixui_liitem"
        >
        Deactivate
        </li>}
      {(listItems.Documentation && listItems.Documentation.length > 0) &&
            <li
              id="menuitemdocumentation"
              className="remixui_liitem"
            >
              <a
                onClick={(evt) => hide(evt, true)}
                onBlur={(evt) => hide(evt, true)}
                href={listItems[item]}
                target="_blank"
              >
                Documentation
              </a>
            </li>
          ))
        : null}
    </Fragment>
  )
}

export default VerticalIconsContextMenu