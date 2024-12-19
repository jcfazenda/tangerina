// custom-http-client.module.ts
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    exports: [HttpClientModule]
})
export class CustomHttpClientModule {}
