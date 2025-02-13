import { createElement, forwardRef } from 'react'
import { css, keyframes } from './css.js'
import { transform } from './transform.js'

import type { Props, Style, As, StyledFn, StyledProxy } from './types.js'

const styled = new Proxy(
  (as: As, style: Style) => {
    const Styled = forwardRef((props: Props, ref) =>
      createElement(
        as,
        transform(
          props,
          props.style
            ? {
                ...style,
                ...props.style,
              }
            : style,
          ref,
        ),
        props.children,
      ),
    )

    return Styled
  },
  {
    get(t: any, p: string) {
      if (!(p in t)) {
        if (p === 'prototype') {
          t[p] = undefined
        } else {
          const as = p.toLowerCase()
          const Styled = forwardRef((props: Props, ref) =>
            createElement(
              as,
              transform(props, props.style, ref),
              props.children,
            ),
          )
          t[p] = Styled
        }
      }
      return t[p]
    },
  },
) as StyledProxy & StyledFn

export type { Props, Style, As, StyledFn }
export { styled, css, keyframes }
