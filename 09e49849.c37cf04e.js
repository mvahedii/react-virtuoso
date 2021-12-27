(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{143:function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"b",(function(){return m}));var r=t(0),o=t.n(r);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=o.a.createContext({}),d=function(e){var n=o.a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},u=function(e){var n=d(e.components);return o.a.createElement(s.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},b=o.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),u=d(t),b=r,m=u["".concat(i,".").concat(b)]||u[b]||p[b]||a;return t?o.a.createElement(m,l(l({ref:n},s),{},{components:t})):o.a.createElement(m,l({ref:n},s))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,i=new Array(a);i[0]=b;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var s=2;s<a;s++)i[s]=t[s];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"},64:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return i})),t.d(n,"metadata",(function(){return l})),t.d(n,"rightToc",(function(){return c})),t.d(n,"default",(function(){return d}));var r=t(2),o=t(6),a=(t(0),t(143)),i={id:"keyboard-navigation",title:"Keyboard Navigation",sidebar_label:"Keyboard Navigation",slug:"/keyboard-navigation/"},l={unversionedId:"keyboard-navigation",id:"keyboard-navigation",isDocsHomePage:!1,title:"Keyboard Navigation",description:"The Virtuoso component exposes an imperative scrollIntoView method, which makes it easy to implement keyboard navigation.",source:"@site/docs/keyboard-navigation.md",slug:"/keyboard-navigation/",permalink:"/keyboard-navigation/",editUrl:"https://github.com/petyosi/react-virtuoso/edit/master/site/docs/keyboard-navigation.md",version:"current",sidebar_label:"Keyboard Navigation",sidebar:"someSidebar",previous:{title:"Window Scrolling",permalink:"/window-scrolling/"},next:{title:"RB DND + Window Scroller",permalink:"/react-beautiful-dnd-window-scroller/"}},c=[],s={rightToc:c};function d(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},s,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("p",null,"The Virtuoso component exposes an imperative ",Object(a.b)("inlineCode",{parentName:"p"},"scrollIntoView")," method, which makes it easy to implement keyboard navigation.\nAs an optional configuration, the method accepts ",Object(a.b)("inlineCode",{parentName:"p"},"behavior: 'smooth' | 'auto'"),", and a ",Object(a.b)("inlineCode",{parentName:"p"},"done")," callback which gets called after the scrolling is done.\nSee the example below for its usage."),Object(a.b)("p",null,"To test the example below, click anywhere in the list and press up / down arrows. "),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx",metastring:"live",live:!0}),"() => {\n  const ref = React.useRef(null)\n  const [currentItemIndex, setCurrentItemIndex] = React.useState(-1)\n  const listRef = React.useRef(null)\n\n  const keyDownCallback = React.useCallback(\n    (e) => {\n      let nextIndex = null\n\n      if (e.code === 'ArrowUp') {\n        nextIndex = Math.max(0, currentItemIndex - 1)\n      } else if (e.code === 'ArrowDown') {\n        nextIndex = Math.min(99, currentItemIndex + 1)\n      }\n\n      if (nextIndex !== null) {\n        ref.current.scrollIntoView({\n          index: nextIndex,\n          behavior: 'auto',\n          done: () => {\n            setCurrentItemIndex(nextIndex)\n          },\n        })\n        e.preventDefault()\n      }\n    },\n    [currentItemIndex, ref, setCurrentItemIndex]\n  )\n\n  const scrollerRef = React.useCallback(\n    (element) => {\n      if (element) {\n        element.addEventListener('keydown', keyDownCallback)\n        listRef.current = element\n      } else {\n        listRef.current.removeEventListener('keydown', keyDownCallback)\n      }\n    },\n    [keyDownCallback]\n  )\n\n  return (\n    <Virtuoso\n      ref={ref}\n      data={generateUsers(200)}\n      itemContent={(index, user) => (\n        <div\n          style={{\n            backgroundColor: user.bgColor,\n            borderColor: index === currentItemIndex ? 'blue' : 'transparent',\n            borderSize: '1px',\n            borderStyle: 'solid',\n            padding: '0.5rem 0.2rem',\n          }}\n        >\n          <h4>{user.name}</h4>\n          <div style={{ marginTop: '1rem' }}>{user.description}</div>\n        </div>\n      )}\n      scrollerRef={scrollerRef}\n      style={{ height: 600 }}\n    />\n  )\n}\n")))}d.isMDXComponent=!0}}]);