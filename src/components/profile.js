import { useParams } from "react-router-dom"

export default function WorkerProfile() {
    const { id } = useParams()

    const workers = [
        { name: "Sarah Amelia", rating: 4.8, total: 2, number: "081234567890", date: "2000-07-05", address: "Jl. Teknik Sipil No. 2" },
        { name: "Linda Wijaya", rating: 4.9, total: 4, number: "081214527870", date: "2000-06-10", address: "Jl. Teknik Nuklir No. 3" },
        { name: "Nina Hartono", rating: 4.7, total: 1, number: "081224597820", date: "2001-02-12", address: "Jl. Teknik Mastar No. 10" },
        { name: "Maria Chen", rating: 4.8, total: 8, number: "081234231910", date: "2000-01-02", address: "Jl. Teknik Sipil No. 12" },
    ]

    const worker = workers[id]

    return (
        <div className="items-center justify-center p-3 w-full h-screen flex items-center justify-center">
            <div className="border border-1 shadow-xl rounded-lg p-10 flex flex-col gap-10">
                <div className="flex flex-col items-center gap-4">
                    <div className="text-3xl font-bold">Profil Pekerja</div>
                    <img src="https://github.com/DaoistXuandu.png" alt="image.png" className="max-w-28  max-h-28" />
                </div>
                <div className="text-lg">
                    <div>Name: {worker.name}</div>
                    <div>Rating: {worker.rating}</div>
                    <div>Jumlah Pesanan Selesai: {worker.total}</div>
                    <div>No. HP: {worker.number}</div>
                    <div>Tanggal Lahir: {worker.date}</div>
                    <div>Alamat: {worker.address}</div>
                </div>
            </div>
        </div>
    )

}

