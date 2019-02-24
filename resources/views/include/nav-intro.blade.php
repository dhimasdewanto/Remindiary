<nav class="nav-intro z-depth-0">
    <div class="nav-wrapper">
        <ul id="nav-mobile" class="left">
            <li>
                <a data-target="dropdown-theme"
                class="dropdown-nav-intro color-text">
                    <i id="icon-theme" class="material-icons left">brightness_medium</i>
                    <span id="selected-theme">{{__('navbar.selectTheme')}}</span>
                    <i class="material-icons right">arrow_drop_down</i>
                </a>
            </li>
        </ul>
        <ul id="nav-mobile" class="right">
            <li>
                <a data-target="dropdown-language"
                class="dropdown-nav-intro color-text">
                    <span id="selected-lang">English</span>
                    <i class="material-icons right">arrow_drop_down</i>
                </a>
            </li>
        </ul>
    </div>
</nav>

{{-- Theme Dropdown --}}
<ul id="dropdown-theme" 
class="dropdown-content color-theme">
    <li>
        <a id="select-theme-dark"
        class="color-text">
            <i class="material-icons left">brightness_3</i>
            {{__('navbar.dark')}}
        </a>
    </li>
    <li>
        <a id="select-theme-light"
        class="color-text">
            <i class="material-icons left">brightness_high</i>
            {{__('navbar.light')}}
        </a>
    </li>
</ul>

{{-- Language Dropdown --}}
<ul id="dropdown-language" 
class="dropdown-content color-theme">
    <li>
        <a id="select-lang-id"
        class="color-text">
            Bahasa Indonesia
        </a>
    </li>
    <li>
        <a id="select-lang-en"
        class="color-text">
            English
        </a>
    </li>
</ul>