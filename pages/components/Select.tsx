import { ChangeEvent, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useField } from 'formik'
import { RootQueryToLocationConnection } from '../../generated/graphql'

// type Option = {
//   item: string
//   value: string
// }

type SelectProps = {
  label: string
  name: string
  emptyFirst?: boolean
  options: string[] | RootQueryToLocationConnection
  onChange?: (e: ChangeEvent) => void
}

type ListOptionProps = {
  idx?: number,
  value?: string,
  option: string
}

export const Select = ({
  name,
  label,
  emptyFirst,
  options,
  onChange,
}: SelectProps) => {
  const [, meta, helpers] = useField(name)
  const { value } = meta
  const { setValue } = helpers

  const onValueChange = (e: ChangeEvent) => {
    if (onChange) {
      onChange(e)
    }
    setValue(e)
  }
// TODO why active/select not working
  function ListOption({idx, option}: ListOptionProps) {
    return (
      <Listbox.Option
        key={idx ? idx : ''}
        value={value ? value : ''}
        className={({ active }) =>
          `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-green-100 text-green-900' : 'text-gray-900' }` } >
        {({ selected }) => (
          <>
            <span
              className={`block truncate capitalize ${
                selected ? 'font-medium' : 'font-normal'
              }`}
            >
              {option}
            </span>
            {selected ? (
              <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-green-600'>
                <CheckIcon className='h-5 w-5' aria-hidden='true' />
              </span>
            ) : null}
            </>
        )}
      </Listbox.Option>
    )
  }



  return (
    <Listbox as='div' name={name} value={value} onChange={onValueChange}>
      <Listbox.Label>{label}</Listbox.Label>
      <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm'>
        {value ? (
          <span className='block truncate capitalize'>{value}</span>
        ) : (
          <span className='block truncate'>Todos</span>
        )}
        <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
          <SelectorIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
        </span>
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave='transition ease-in duration-100'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <Listbox.Options className='absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
          {emptyFirst ? (
            <ListOption option='Todos' />
          ) : (
            ''
          )}
          {console.log(`inside: ${Array.isArray(options)}`)}
          {Array.isArray(options)
            ? options.map((option, idx) => <ListOption key={idx} value={option} option={option} /> )
            : (options.nodes?.map((option) => {
               option?.children ? "hola":"adios"
            })
          )}
        </Listbox.Options>
      </Transition>
    </Listbox>
  )
}

export default Select
