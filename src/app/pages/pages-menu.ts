import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Atendimento',
    icon: 'phone-call-outline',
    link: '/pages/attendence',
  },
  {
    title: 'Parametrizações',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Terminais',
        link: '/pages/parameterization/terminals',
        icon: 'clipboard-outline'
      },
      {
        title: 'Filas',
        link: '/pages/parameterization/queues',
        icon: 'layers-outline'
      },
      {
        title: 'Permissões',
        link: '/pages/parameterization/permissions',
        icon: 'people-outline'
      },
      {
        title: 'Perfis',
        link: '/pages/parameterization/profiles',
        icon: 'pricetags-outline'
      },

      {
        title: 'Usuários',
        link: '/pages/parameterization/users',
        icon: 'person-outline'
      }

    ],
  },
  {
    title: 'Administrativo',
    icon: 'home-outline',
    link: '/pages/administrative',
  },
  {
    title: 'Autenticação',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
    ],
  },

  {
    title: 'Gerenciador',
    icon: 'settings-2-outline',
    children: [
      {
        title: 'Gerenciar Empresas',
        link: '/pages/manager/manager-companies',
        icon: 'settings-outline'
      }
    ],
  },


];
