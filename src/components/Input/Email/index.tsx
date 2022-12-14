import Button from 'app/components/Button'
import { classNames, escapeRegExp } from 'app/functions'

import React from 'react'


const defaultClassName = 'bg-white'

export const Input = React.memo(
  ({
    value,
    handleInput,
    error,
    placeholder,
    hasControl,
    className = defaultClassName,
    ...rest
  }: {
    value: string | number
    handleInput: (input: string) => void
    error?: boolean
    placeholder?: string
    hasControl?: boolean
    fontSize?: string
    align?: 'right' | 'left'
  } & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>) => {
    const enforcer = (nextUserInput: string) => {
      handleInput(nextUserInput)
    }

    return (
      <div className='flex justify-end align-middle'>
        <input
          {...rest}
          value={value}
          onChange={(event) => {
            enforcer(event.target.value.replace(/,/g, '.'))
          }}
          // universal input options
          inputMode="email"
          autoComplete="off"
          autoCorrect="off"
          // text-specific options
          type="email"
          pattern="[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$"
          placeholder={placeholder || 'Enter your email'}
          spellCheck="false"
          className={classNames(
            'relative outline-none px-4 h-[38px] border flex-auto overflow-hidden overflow-ellipsis placeholder-light-gray focus:placeholder-dark-gray rounded-1 transition-all ease-in',
            className, error ? 'border-red focus:border-red' : 'border-stroke focus:border-blue'
          )}
        />
        {hasControl && <Button variant="link" size="sm" className="absolute bg-white m-[4px] h-[30px] text-blue/90 hover:text-blue border-l rounded-none">Send</Button>}
      </div>

    )
  }
)

Input.displayName = 'EmailInput'

export default Input

// const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group
