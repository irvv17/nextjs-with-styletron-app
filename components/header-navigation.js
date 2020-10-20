/*
Copyright (c) 2018-2020 Uber Technologies, Inc.
This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import Link from 'next/link';

// import DarkLogo from '../images/base-web.svg';
// import LightLogo from '../images/base-web-white.svg';
import {themedUseStyletron as useStyletron} from '../pages/_app';
import Menu from 'baseui/icon/menu';
import AlignLeftIcon from './icons/align-left';
import AlignRightIcon from './icons/align-right';
import VersionSelector from './version-selector.js';
import Search from './search';
import Bulb from './icons/bulb';
import {Button, KIND, SIZE, SHAPE} from 'baseui/button';

// Breakpoint for un-wrapping the search bar from under the links and toggles.
const WRAP_SEARCH = 715;

const mq = (breakpoint) =>
    `@media screen and (min-width: ${breakpoint}px)`;

export default function HeaderNavigation({
                                             toggleSidebar,
                                             toggleTheme,
                                             toggleDirection,
                                         }) {
    const [css, theme] = useStyletron();
    return (
        <header
            className={css({
                ...theme.typography.ParagraphMedium,
                display: 'flex',
                flexWrap: 'wrap',
                paddingTop: theme.sizing.scale500,
                paddingBottom: theme.sizing.scale500,
                paddingLeft: theme.sizing.scale800,
                paddingRight: theme.sizing.scale800,
                borderBottomStyle: 'solid',
                borderBottomWidth: '1px',
                borderBottomColor: theme.colors.border,
                [mq(WRAP_SEARCH)]: {
                    flexWrap: 'nowrap',
                },
            })}
        >
            {/* Logo & Links  */}
            <div
                className={css({
                    marginLeft: theme.direction === 'rtl' ? 'auto' : 'none',
                    marginRight: theme.direction === 'rtl' ? 'none' : 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    order: 1,
                })}
            >
                {/* Base Web Logo */}
                <Link href="/">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                        className={css({
                            display: 'flex',
                            marginLeft:
                                theme.direction === 'rtl' ? theme.sizing.scale400 : 'none',
                            marginRight:
                                theme.direction === 'rtl' ? 'none' : theme.sizing.scale400,
                            ':focus': {
                                outline: `3px solid ${theme.colors.accent}`,
                                outlineOffset: '5px',
                            },
                        })}
                    >
                        <img
                            src={theme.name.startsWith('dark') ? "DARK" : "LIGHT"}
                            className={css({height: '40px'})}
                            alt="Base Web"
                        />
                    </a>
                </Link>

                {/* Version Selector */}
                <div
                    className={css({
                        display: 'none',
                        [mq(400)]: {
                            display: 'block',
                        },
                    })}
                >
                    <VersionSelector />
                </div>

                {/* Link to Blog */}
                <Link href="/blog/base-web-v9" passHref>
                    <Button
                        $as="a"
                        size={SIZE.compact}
                        kind={KIND.minimal}
                        overrides={{
                            BaseButton: {
                                style: {
                                    display: 'none',
                                    [mq(875)]: {
                                        display: 'block',
                                    },
                                },
                            },
                        }}
                    >
                        {"What's new in v9?"}
                    </Button>
                </Link>

                {/* Link to component gallery */}
                <Link href="/components" passHref>
                    <Button
                        $as="a"
                        size={SIZE.compact}
                        kind={KIND.minimal}
                        overrides={{
                            BaseButton: {
                                style: {
                                    display: 'none',
                                    [mq(1000)]: {
                                        display: 'block',
                                    },
                                },
                            },
                        }}
                    >
                        Components
                    </Button>
                </Link>
            </div>

            {/* Search */}
            <div
                className={css({
                    flexBasis: '100%',
                    order: 3,
                    marginTop: theme.sizing.scale400,
                    [mq(WRAP_SEARCH)]: {
                        flexBasis: 'auto',
                        order: 2,
                        marginTop: '0',
                        marginLeft:
                            theme.direction === 'rtl' ? theme.sizing.scale400 : 'none',
                        marginRight:
                            theme.direction === 'rtl' ? 'none' : theme.sizing.scale400,
                    },
                })}
            >
                <Search />
            </div>

            {/* Toggles & Links */}
            <div
                className={css({
                    display: 'flex',
                    alignItems: 'center',
                    order: 2,
                    [mq(WRAP_SEARCH)]: {
                        order: 3,
                    },
                })}
            >

                {/* Direction Toggle */}
                <Button
                    onClick={toggleDirection}
                    size={SIZE.compact}
                    kind={KIND.tertiary}
                    shape={SHAPE.square}
                    title="Toggle direction"
                    overrides={{
                        BaseButton: {
                            style: {
                                display: 'none',
                                [mq(450)]: {
                                    display: 'flex',
                                },
                            },
                        },
                    }}
                >
                    {theme.direction === 'rtl' ? (
                        <AlignLeftIcon size={24} color={theme.colors.contentPrimary} />
                    ) : (
                        <AlignRightIcon size={24} color={theme.colors.contentPrimary} />
                    )}
                </Button>

                {/* Theme Toggle */}
                <Button
                    onClick={toggleTheme}
                    size={SIZE.compact}
                    kind={KIND.tertiary}
                    shape={SHAPE.square}
                    title="Toggle theme"
                    overrides={{
                        BaseButton: {
                            style: {
                                display: 'flex',
                            },
                        },
                    }}
                >
                    <Bulb size={24} color={theme.colors.contentPrimary} />
                </Button>

                {/* Nav Toggle */}
                <Button
                    onClick={toggleSidebar}
                    size={SIZE.compact}
                    kind={KIND.tertiary}
                    shape={SHAPE.square}
                    title="Toggle navigation"
                    overrides={{
                        BaseButton: {
                            style: {
                                display: 'flex',
                                [theme.mediaQuery.medium]: {
                                    display: 'none',
                                },
                            },
                        },
                    }}
                >
                    <Menu size={24} color={theme.colors.contentPrimary} />
                </Button>
            </div>
        </header>
    );
}