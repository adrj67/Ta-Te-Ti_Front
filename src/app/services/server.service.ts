import { inject, Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { UsuarioService } from './usuario.service';
import { SalaBackend } from '../intefaces/sala';
import { Subject } from 'rxjs';

// Conexion al servidor con Node

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  server = io("localhost:3000", {autoConnect:false});
  usuarioService = inject(UsuarioService);
  
  actualizacionDeSala$ = new Subject<SalaBackend>();

  constructor() {
    this.server.on("connect", ()=>{
      //console.log("Conectado al back")
    });
    this.server.on("sala", (args) => {
      this.actualizacionDeSala$.next(args);
    })
    this.server.connect();
   }

}