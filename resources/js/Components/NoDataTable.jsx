
const NoDataTable = () => {
  return (
    <tr>
        <td className="p-4 text-center bg-gray-200" colSpan={100}>
            <div className="flex justify-center">
                <div className="rounded-md bg-[#00114d] text-white w-fit px-2 text-sm">Tidak Ada Data</div>
            </div>
        </td>
    </tr>
  )
}

export default NoDataTable
