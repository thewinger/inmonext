import { Listbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'

interface formattedArray {
  name: string
  value: string
}

type ListOptionProps = {
  idx?: number
  option: formattedArray
}

const ListOption = ({ idx, option }: ListOptionProps) => {
  return (
    <Listbox.Option
      key={idx ? idx : ''}
      value={option}
      className={({ active }) =>
        `relative cursor-default select-none py-2 pl-10 pr-4 ${
          active ? 'bg-green-100 text-green-900' : 'text-slate-900'
        }`
      }
    >
      {({ selected }) => (
        <>
          <span
            className={`block truncate capitalize ${
              selected ? 'font-medium' : 'font-normal'
            }`}
          >
            {option.name}
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

export default ListOption
