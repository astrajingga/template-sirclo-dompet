/* library package */
import { FC } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ResetPassword, useI18n } from '@sirclo/nexus';
import { toast } from 'react-toastify';

/* library template */
import { parseCookies } from 'lib/parseCookies';
import redirectIfAuthenticated from 'lib/redirectIfAuthenticated';
import { useBrand } from 'lib/utils/useBrand';

/* component */
import Layout from 'components/Layout/Layout';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';
import Loader from 'components/Loader/Loader';

const classesResetPassword = {
  containerClassName: "forgot-password-page-form",
  inputContainerClassName: "sirclo-form-row",
  inputClassName: "form-control sirclo-form-input",
  buttonClassName: "btn login-page-btnLogin btn-long col-md-12",
  spinnerClassName: "spinner",
}

const ForgotPassword: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();

  const linksBreadcrumb = [`${i18n.t("home.title")}`, `${i18n.t("resetPassword.title")}`]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <div className="container">
        <div className="forgot-password-page-container">
          <div className="forgot-password-page-inner">
            <h3 className="forgot-password-page-title">
              {i18n.t("resetPassword.titleChild")}
            </h3>
            <span className="forgot-password-page-subtitle">
              {i18n.t("resetPassword.subTitle")}
            </span>
            <ResetPassword
              classes={classesResetPassword}
              onErrorMsg={(msg) => toast.error(msg)}
              onSuccessMsg={(msg) => toast.success(msg)}
              loadingComponent={<Loader color="text-light" />}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  const cookies = parseCookies(req);
  redirectIfAuthenticated(res, cookies, 'account');

  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ''
    },
  };
}

export default ForgotPassword;
