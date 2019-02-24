@extends('layouts.auth')

@section('content_auth')

@include('include.nav-intro')

<div id="portofolio">

    <div class="row">

        {{-- Description --}}
        <div class="col l8 s12 col-left">

            <h2 data-position="top" 
            data-tooltip="Dhimas Bagus Rizky Dewanto"
            class="tooltip-pages color-text">
                {{ __('Dhimas Dewanto') }}
            </h2>

            <p class="color-text">

                <span data-position="bottom" 
                data-tooltip="NIM: 2001608111"
                class="tooltip-pages">
                    Binusian 2020, 
                </span>

                <span>{{__('intro.aProgrammer')}}, </span>

                <span>
                    <span data-position="bottom" 
                    data-tooltip="{{__('intro.frontEndExplain')}}"
                    class="tooltip-pages">
                        front-end 
                    </span>

                    {{__('intro.and')}} 

                    <span data-position="bottom" 
                    data-tooltip="{{__('intro.backEndExplain')}}"
                    class="tooltip-pages">
                        back-end.
                    </span>
                </span>

            </p>

            <a data-position="bottom" 
            data-tooltip="remindiary.com"
            href="{{ route('home') }}"
            class="btn waves-effect waves-light tooltip-pages">
                {{__('intro.myProject')}}: Remindiary
            </a>

        </div>

        {{-- Email, phone, etc --}}
        <div class="col l4 s12 col-right">

            <div class="contact-div">
                <a href = "mailto: dhimas.dewanto@binus.ac.id"
                class="contact color-link-hover-p">
                    <i class="material-icons left">email</i>
                    dhimas.dewanto@binus.ac.id
                </a>
            </div>
            <div class="contact-div">
                <a class="contact color-link-hover-p">
                    <i class="material-icons left">phone</i>
                    085329652xxx
                </a>
            </div>
            <div class="contact-div bottom">
                <a href="https://goo.gl/maps/sNMLoGybnW72"
                target="_blank"
                class="contact color-link-hover-p">
                    <i class="material-icons left">location_city</i>
                    Kota Tangerang
                </a>
            </div>

        </div>

    </div>

</div>

@endsection