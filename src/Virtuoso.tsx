import React, { ComponentType, CSSProperties, FC, PureComponent, ReactElement } from 'react'
import { TScrollLocation } from './EngineCommons'
import { ListRange, ScrollSeekToggle } from './engines/scrollSeekEngine'
import { ListItem } from './GroupIndexTransposer'
import { TSubscriber } from './tinyrx'
import { VirtuosoContext } from './VirtuosoContext'
import { TRender, TRenderProps } from './VirtuosoList'
import { VirtuosoStore } from './VirtuosoStore'
import { DefaultListContainer, TFooterContainer, TListContainer, TScrollContainer, VirtuosoView } from './VirtuosoView'

export type VirtuosoState = ReturnType<typeof VirtuosoStore>

export type TItemContainer = React.FC<Omit<TRenderProps, 'renderPlaceholder' | 'scrollVelocity'>>

type TSeekPlaceholder = ComponentType<{ height: number; index: number }>

export interface VirtuosoProps {
  totalCount: number
  overscan?: number
  topItems?: number
  footer?: () => ReactElement
  item: (index: number) => ReactElement
  computeItemKey?: (index: number) => number
  prependItemCount?: number
  itemHeight?: number
  defaultItemHeight?: number
  endReached?: (index: number) => void
  scrollingStateChange?: TSubscriber<boolean>
  atBottomStateChange?: TSubscriber<boolean>
  itemsRendered?: TSubscriber<ListItem[]>
  rangeChanged?: TSubscriber<ListRange>
  totalListHeightChanged?: TSubscriber<number>
  style?: CSSProperties
  className?: string
  initialItemCount?: number
  initialTopMostItemIndex?: number
  followOutput?: boolean
  ScrollContainer?: TScrollContainer
  FooterContainer?: TFooterContainer
  ListContainer?: TListContainer
  ItemContainer?: TItemContainer
  maxHeightCacheSize?: number
  scrollSeek?: {
    enter: ScrollSeekToggle
    change: (velocity: number, range: ListRange) => void
    exit: ScrollSeekToggle
    placeholder: TSeekPlaceholder
  }
}

interface TVirtuosoPresentationProps {
  contextValue: VirtuosoState
  item: TRender
  footer?: () => ReactElement
  style?: CSSProperties
  className?: string
  itemHeight?: number
  ScrollContainer?: TScrollContainer
  FooterContainer?: TFooterContainer
  ListContainer?: TListContainer
}

export { TScrollContainer, TListContainer }

export const VirtuosoPresentation: FC<TVirtuosoPresentationProps> = ({
  contextValue,
  style,
  className,
  item,
  footer,
  itemHeight,
  ScrollContainer,
  ListContainer,
  FooterContainer,
}) => {
  return (
    <VirtuosoContext.Provider value={contextValue}>
      <VirtuosoView
        style={style || {}}
        className={className}
        item={item}
        footer={footer}
        fixedItemHeight={itemHeight !== undefined}
        ScrollContainer={ScrollContainer}
        FooterContainer={FooterContainer}
        ListContainer={ListContainer || DefaultListContainer}
      />
    </VirtuosoContext.Provider>
  )
}

export class Virtuoso extends PureComponent<VirtuosoProps, VirtuosoState> {
  public constructor(props: VirtuosoProps) {
    super(props)
    this.state = VirtuosoStore(props)
  }

  public static getDerivedStateFromProps(props: VirtuosoProps, state: VirtuosoState) {
    state.isScrolling(props.scrollingStateChange)
    state.atBottomStateChange(props.atBottomStateChange)
    state.endReached(props.endReached)
    state.topItemCount(props.topItems || 0)
    state.totalCount(props.totalCount)
    props.initialItemCount && state.initialItemCount(props.initialItemCount)
    state.itemsRendered(props.itemsRendered)
    state.totalListHeightChanged(props.totalListHeightChanged)
    state.followOutput(!!props.followOutput)
    state.maxRangeSize(props.maxHeightCacheSize || Infinity)
    state.rangeChanged(props.rangeChanged)
    state.scrollSeekConfiguration(props.scrollSeek)
    return null
  }

  private itemRender: TRender = (item, { key, renderPlaceholder, ...props }) => {
    const { scrollSeek, computeItemKey, item: itemRender, ItemContainer = 'div' } = this.props
    if (computeItemKey) {
      key = computeItemKey(item.index)
    }

    let children: ReactElement
    if (scrollSeek && renderPlaceholder) {
      children = React.createElement(scrollSeek.placeholder, { height: props['data-known-size'], index: item.index })
    } else {
      children = itemRender(item.index)
    }

    return React.createElement(ItemContainer, { ...props, key }, children)
  }

  public scrollToIndex(location: TScrollLocation) {
    this.state.scrollToIndex(location)
  }

  public adjustForPrependedItems(count: number) {
    this.state.adjustForPrependedItems(count)
  }

  public componentWillUnmount() {
    this.state.itemsRendered(undefined)
    this.state.totalListHeightChanged(undefined)
  }

  public render() {
    return (
      <VirtuosoPresentation
        contextValue={this.state}
        style={this.props.style}
        className={this.props.className}
        item={this.itemRender}
        footer={this.props.footer}
        itemHeight={this.props.itemHeight}
        ScrollContainer={this.props.ScrollContainer}
        FooterContainer={this.props.FooterContainer}
        ListContainer={this.props.ListContainer}
      />
    )
  }
}
