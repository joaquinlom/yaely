# TODO
## Usuario
   - nombre
   - correo 
   - contrasena (encrypted)
   - HouseID
   - firebase_token  (Token de firebase cuando se inicie sesion y se le asigne)
   - jwt_token  (Token generado una vez iniciado sesion, para hacer futuras peticiones)
   - socketId (Id del socket de websockets)
   - status (Activo o inactivo)
   - timestamp
   - activation_token (token generado para activar, una vez accedido, podra estar como activo)

## House/Casa:
   - ID
   - Nombre  
   - Duracion de regado (Tiempo default de regado)
   - frequency (Frecuencia de regado , si esque esta configurado)

## Device  
   - UUID
   - estado (online/offline)
   - ground_moist (estado de humedad de la planta)
   - deposit_moist (estado del deposito)
   - valve_status (estado de la valvula, abierta/cerrada)  

## Photos
   - img (base64 de la imagen)
   - timestamp (tiempo en cual fue captuada)
   - userId  (Usuario quien la tomo)  

## watering
   - timestamp (fecha en la que se rego)
   - duration (Duracion en la que se rego)
   - userId (Usuario quien solicito el riego)

## Acciones
   Al ser un prototipo, solo existira una casa (House), por lo que solo se podra crear usuarios relacionados ala unica casa.
   - Crear usuarios dentro de la casa, este enviara un correo para activar el usuario
   - Modificar tiempo default de regado, cualquiera dela casa puede.
   - Asignar frecuencia para regado automatico.
   - Modificar las propiedades del device, este solo lo podra hacer desde raspberry Pi
   - Crear una foto, subir la imagen al servidor
   - Ver la ultima foto subida al servidor
   - Solicitar un riego del dispositivo, este asignara la valvula a abierta , pero sera comunicacion con Websockets; Solo se hara si la valvula esta cerrada y el dispositivo online. 
   


