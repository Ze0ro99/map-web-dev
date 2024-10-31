class MainActivity : AppCompatActivity(), OnMapReadyCallback {
    private lateinit var map: GoogleMap
    private lateinit var mapView: MapView
    private lateinit var firebaseAuth: FirebaseAuth
    private lateinit var storeInfo: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // إعداد Firebase
        firebaseAuth = FirebaseAuth.getInstance()

        // إعداد MapView
        mapView = findViewById(R.id.mapView)
        storeInfo = findViewById(R.id.storeInfo)
        mapView.onCreate(savedInstanceState)
        mapView.getMapAsync(this)

        checkLocationPermissions()
    }

    // التحقق من الأذونات
    private fun checkLocationPermissions() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            map.isMyLocationEnabled = true
        } else {
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.ACCESS_FINE_LOCATION), LOCATION_PERMISSION_REQUEST_CODE)
        }
    }

    override fun onMapReady(googleMap: GoogleMap) {
        map = googleMap

        // إعداد الخرائط وخصائصها
        loadStores()
    }

    private fun loadStores() {
        // احصل على المتاجر من Firebase Firestore أو Room وأضف علامات
        val db = FirebaseFirestore.getInstance()
        db.collection("stores")
            .get()
            .addOnSuccessListener { result ->
                for (document in result) {
                    val lat = document.getDouble("latitude") ?: 0.0
                    val lng = document.getDouble("longitude") ?: 0.0
                    val storeName = document.getString("name") ?: "Unknown"

                    // إضافة علامة للمتجر
                    val marker = map.addMarker(
                        MarkerOptions()
                            .position(LatLng(lat, lng))
                            .title(storeName)
                    )

                    marker?.tag = document.id
                }
            }
    }
}
