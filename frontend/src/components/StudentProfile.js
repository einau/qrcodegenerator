// ... existing imports ...

export default function StudentProfile() {
  const { id } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [qrUrl, setQrUrl] = useState('');
  
  useEffect(() => {
    fetch(`/api/verify/${id}`)
      .then(res => res.json())
      .then(data => setStudentData(data));
    
    fetch(`/api/qrcode-url/${id}`)
      .then(res => res.json())
      .then(data => setQrUrl(data.url));
  }, [id]);

  // ... rest of component ...

  // In QR Code section:
  {qrUrl && (
    <div className="mt-8 text-center border-t pt-6">
      <h3 className="text-lg font-semibold mb-3">Certificate QR Code</h3>
      <div className="bg-white p-4 inline-block border rounded-lg">
        <img 
          src={qrUrl} 
          alt="Certificate QR Code" 
          className="w-32 h-32"
        />
      </div>
      <a 
        href={qrUrl} 
        download={`FlyOntime-Certificate-${id}.png`}
        className="mt-4 inline-block bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-5 rounded-lg"
      >
        Download QR Code
      </a>
    </div>
  )}
}
